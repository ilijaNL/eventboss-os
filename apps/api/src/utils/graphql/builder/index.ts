import { OperationDefinitionNode, DefinitionNode, FieldNode, Kind } from 'graphql';
import { renameVariablesAndTopLevelFields, defaultRenameFn, renameVariables } from './utils';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';

const emptyDoc: TypedDocumentNode = {
  kind: Kind.DOCUMENT,
  definitions: [],
};

const emptyCommand = cGQL(emptyDoc);

export type GraphqlCommand<TData = any, TVariables = any> = {
  document: TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
};

export function cGQL<TData, TVariables>(
  doc: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
): GraphqlCommand<TData, TVariables> {
  return {
    document: doc,
    variables: variables,
  };
}

class CombinedQueryError extends Error {}

export function add<TData, TVariables, TDataAdd, TVariablesAdd>(
  base: GraphqlCommand<TData, TVariables>,
  document: TypedDocumentNode<TDataAdd, TVariablesAdd>,
  variables?: TVariablesAdd
): GraphqlCommand<TData & TDataAdd, TVariables & TVariablesAdd> {
  const opDefs = base.document.definitions
    .concat(document.definitions)
    .filter((def: DefinitionNode): def is OperationDefinitionNode => def.kind === Kind.OPERATION_DEFINITION);
  if (!opDefs.length) {
    throw new CombinedQueryError('Expected at least one OperationDefinition, but found none.');
  }

  // do some basic validation
  opDefs.forEach((def) => {
    const otherOpDefs = opDefs.filter((_def) => _def !== def);

    // all op defs must be of the same type
    otherOpDefs.forEach((_def) => {
      if (_def.operation !== def.operation) {
        throw new CombinedQueryError(
          `expected all operations to be of the same type, but ${_def.name?.value} is ${_def.operation} and ${def.name?.value} is ${def.operation}`
        );
      }
    });

    // all top level fields mut be unique. doesn't drill down fragments tho. maybe someday
    def.selectionSet.selections
      ?.filter((s): s is FieldNode => s.kind === Kind.FIELD)
      .forEach((sel) => {
        otherOpDefs.forEach((_def) =>
          _def.selectionSet.selections
            ?.filter((s): s is FieldNode => s.kind === Kind.FIELD)
            .forEach((_sel) => {
              if ((sel.alias?.value || sel.name.value) === (_sel.alias?.value || _sel.name.value)) {
                throw new CombinedQueryError(
                  `duplicate field definition ${_sel.name.value} for operations ${def.name?.value} and ${_def.name?.value}`
                );
              }
            })
        );
      });

    // finally all variables must be unique
    def.variableDefinitions?.forEach((variable) => {
      otherOpDefs.forEach((_def) =>
        _def.variableDefinitions?.forEach((_variable) => {
          if (variable.variable.name.value === _variable.variable.name.value) {
            throw new CombinedQueryError(
              `duplicate variable definition ${_variable.variable.name.value} for operations ${def.name?.value} and ${_def.name?.value}`
            );
          }
        })
      );
    });
  });

  const newVars: TVariables & TVariablesAdd = (() => {
    if (base.variables && variables) {
      return {
        ...base.variables,
        ...variables,
      } as TVariables & TVariablesAdd;
    }
    return (variables || base.variables) as TVariables & TVariablesAdd;
  })();

  let definitions: DefinitionNode[] = [
    {
      kind: Kind.OPERATION_DEFINITION,
      directives: opDefs.flatMap((def) => def.directives || []),
      name: { kind: Kind.NAME, value: opDefs[0]!.name?.value ?? 'generated_ops' },
      operation: opDefs[0]!.operation,
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections: opDefs.flatMap((def) => def.selectionSet.selections),
      },
      variableDefinitions: opDefs.flatMap((def) => def.variableDefinitions || []),
    },
  ];
  const encounteredFragmentList = new Set<string>();
  const combinedDocumentDefinitions = base.document.definitions.concat(document.definitions);
  for (const definition of combinedDocumentDefinitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      continue;
    }
    if (definition.kind === Kind.FRAGMENT_DEFINITION) {
      if (encounteredFragmentList.has(definition.name.value)) {
        continue;
      }
      encounteredFragmentList.add(definition.name.value);
    }
    definitions = [definition, ...definitions];
  }

  const newDoc: TypedDocumentNode<TData & TDataAdd, TVariables & TVariablesAdd> = {
    kind: Kind.DOCUMENT,
    definitions,
  };

  return cGQL(newDoc, newVars);
}

export function addAll(items: GraphqlCommand<any, any>[], base = emptyCommand): GraphqlCommand<any, any> {
  if (!items.length) {
    return base;
  }

  return items.reduce((builder, item, idx) => {
    const doc = renameVariablesAndTopLevelFields(
      item.document,
      (name) => defaultRenameFn(name, idx),
      (name) => defaultRenameFn(name, idx)
    );
    const vars = renameVariables(item.variables, (name) => defaultRenameFn(name, idx));
    return add(builder, doc, vars);
  }, base);
}
