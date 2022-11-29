import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import getConfig from '../config';
import { print } from 'graphql';
import { getAuthHeaders, RequestContext } from './context';

export const authFetch = async <TData, TVariables>(
  doc: TypedDocumentNode<TData, TVariables>,
  variables: TVariables,
  context: RequestContext
) => {
  const authHeaders = getAuthHeaders(context);
  return graphqlDocFetch(doc, variables, { ...authHeaders });
};

export const graphqlDocFetch = <TData, TVars>(
  documentNode: TypedDocumentNode<TData, TVars>,
  variables?: TVars,
  headers?: HeadersInit
) => {
  return graphqlFetch<TData, TVars>(print(documentNode), variables, headers);
};

export const graphqlFetch = async <TData, TVariables>(query: string, variables?: TVariables, headers?: HeadersInit) => {
  const res = await fetch(getConfig('GRAPHQL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    const { message } = json.errors[0] || 'Error..';
    throw new Error(message);
  }

  return json.data as TData;
};
