import {
  SelectionSetNode,
  ValueNode,
  Kind,
  ArgumentNode,
  VariableDefinitionNode,
  DirectiveNode,
  OperationDefinitionNode,
  DocumentNode,
  DefinitionNode,
} from 'graphql';

export type RenameFn = (name: string) => string;
export type RenameFnWithIndex = (name: string, index: number) => string;
export const defaultRenameFn: RenameFnWithIndex = (name, index) => `${name}_${index}`;

export function renameValue(node: ValueNode, renameFn: RenameFn): ValueNode {
  if (node.kind === Kind.VARIABLE) {
    return {
      ...node,
      name: {
        ...node.name,
        value: renameFn(node.name.value),
      },
    };
  } else if (node.kind === Kind.OBJECT) {
    return {
      ...node,
      fields: node.fields.map((field) => ({
        ...field,
        value: renameValue(field.value, renameFn),
      })),
    };
  } else if (node.kind === Kind.LIST) {
    return {
      ...node,
      values: node.values.map((value) => renameValue(value, renameFn)),
    };
  }

  return node;
}

export function renameArgument(node: ArgumentNode, renameFn: RenameFn): ArgumentNode {
  return {
    ...node,
    value: renameValue(node.value, renameFn),
  };
}

export function renameDirectiveArguments(node: DirectiveNode, renameFn: RenameFn): DirectiveNode {
  return {
    ...node,
    arguments: node.arguments?.map((arg) => renameArgument(arg, renameFn)) ?? [],
  };
}

export function renameVariableDefinition(node: VariableDefinitionNode, renameFn: RenameFn): VariableDefinitionNode {
  return {
    ...node,
    variable: {
      ...node.variable,
      name: {
        ...node.variable.name,
        value: renameFn(node.variable.name.value),
      },
    },
    directives: node.directives?.map((dir) => renameDirectiveArguments(dir, renameFn)) ?? ([] as any),
  };
}

export function renameSelectionSetArguments(
  selectionSet: SelectionSetNode,
  renameFn: (name: string) => string
): SelectionSetNode {
  return {
    ...selectionSet,
    selections: selectionSet.selections.map((sel) => {
      switch (sel.kind) {
        case Kind.FIELD:
          return {
            ...sel,
            arguments: sel.arguments?.map((arg) => renameArgument(arg, renameFn)),
            selectionSet: sel.selectionSet ? renameSelectionSetArguments(sel.selectionSet, renameFn) : undefined,
          };
        case Kind.FRAGMENT_SPREAD:
          return {
            ...sel,
            directives: sel.directives?.map((dir) => renameDirectiveArguments(dir, renameFn)),
          };
        case Kind.INLINE_FRAGMENT:
          return {
            ...sel,
            directives: sel.directives?.map((dir) => renameDirectiveArguments(dir, renameFn)),
            selectionSet: renameSelectionSetArguments(sel.selectionSet, renameFn),
          };
      }
    }),
  };
}

export function renameVariablesAndTopLevelFieldsOnOpDef(
  op: OperationDefinitionNode,
  variableRenameFn: RenameFn,
  fieldRenameFn: RenameFn
): OperationDefinitionNode {
  return {
    ...op,
    variableDefinitions: op.variableDefinitions?.map((vardef) => renameVariableDefinition(vardef, variableRenameFn)),
    directives: op.directives?.map((dir) => renameDirectiveArguments(dir, variableRenameFn)),
    selectionSet: renameSelectionSetArguments(
      {
        ...op.selectionSet,
        selections: op.selectionSet.selections.map((sel) => {
          switch (sel.kind) {
            case Kind.FIELD:
              return {
                ...sel,
                alias: {
                  ...sel.name,
                  value: fieldRenameFn(sel.alias?.value ?? sel.name.value),
                },
              };
            default:
              return sel;
          }
        }),
      },
      variableRenameFn
    ),
  };
}

export function renameVariablesAndTopLevelFields(
  doc: DocumentNode,
  variableRenameFn: RenameFn,
  fieldRenameFn: RenameFn
): DocumentNode {
  return {
    ...doc,
    definitions: [
      ...doc.definitions.filter((def) => def.kind !== Kind.OPERATION_DEFINITION),
      ...doc.definitions
        .filter((def: DefinitionNode): def is OperationDefinitionNode => def.kind === Kind.OPERATION_DEFINITION)
        .map((opDef) => {
          return renameVariablesAndTopLevelFieldsOnOpDef(opDef, variableRenameFn, fieldRenameFn);
        }),
    ],
  };
}

export function renameVariables(variables: Record<string, any>, renameFn: RenameFn): Record<string, any> {
  return Object.keys(variables).reduce((vars, key) => {
    return {
      ...vars,
      [renameFn(key)]: variables[key],
    };
  }, {});
}
