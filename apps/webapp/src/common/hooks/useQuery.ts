import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { OperationDefinitionNode } from 'graphql';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { authFetch, graphqlDocFetch } from '@/utils/graphqlClient';
import { RequestContext } from '@/utils/context';

export const isFunction = (v: any): v is () => any => typeof v == 'function';

export type Falsy = false | 0 | '' | null | undefined;

export const getKeyFromDocument = (documentNode: TypedDocumentNode<any, any>) => {
  // construct react-query key from OperationDefinition
  return (documentNode.definitions.filter((d) => d.kind === 'OperationDefinition') as OperationDefinitionNode[]).map(
    (d) => d.name?.value as string
  );
};

export type Variables<TVars> = TVars | (() => TVars);

/**
 * Create a request without a session
 * The request will be disabled if varsOrVarsFn returns falsy or throws.
 * @param documentNode document node which is used to make a request
 * @param varsOrVarsFn
 * @param options react query options
 * @returns
 */
export function usePublicQuery<TQueryFnData = unknown, TVars = unknown, TError = unknown, TData = TQueryFnData>(
  documentNode: TypedDocumentNode<TQueryFnData, TVars>,
  varsOrVarsFn: Variables<TVars | Falsy>,
  options?: UseQueryOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> {
  let variables: TVars | Falsy;

  try {
    variables = isFunction(varsOrVarsFn) ? varsOrVarsFn() : varsOrVarsFn;
  } catch (e) {
    variables = false;
  }

  const disabled = options?.enabled === false || !variables;
  // construct key
  const key = [...getKeyFromDocument(documentNode), variables] as const;

  return useQuery(key as QueryKey, () => graphqlDocFetch(documentNode, variables as TVars), {
    ...options,
    enabled: !disabled,
  });
}

/**
 * Create a request which is authenticated from user session
 * The request will be disabled if varsOrVarsFn returns falsy or throws. It is also disabled if no user session exists
 * @param context the RequestContext wich will be used
 * @param documentNode document node which is used to make a request
 * @param varsOrVarsFn
 * @param options react query options
 * @returns
 */
export function useAuthQuery<TQueryFnData = unknown, TVars = unknown, TError = unknown, TData = TQueryFnData>(
  context: RequestContext,
  documentNode: TypedDocumentNode<TQueryFnData, TVars>,
  varsOrVarsFn: Variables<TVars | Falsy>,
  options?: UseQueryOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> {
  let variables: TVars | Falsy;

  // if it throws, disable the query
  // this is a dependent query thens
  try {
    variables = isFunction(varsOrVarsFn) ? varsOrVarsFn() : varsOrVarsFn;
  } catch (e) {
    variables = false;
  }

  const disabled = options?.enabled === false || !variables;
  // construct key
  const key = [...getKeyFromDocument(documentNode), variables, context] as const;

  return useQuery(key as QueryKey, () => authFetch(documentNode, variables as TVars, context), {
    ...options,
    enabled: !disabled,
  });
}
