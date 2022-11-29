import { RequestContext } from '@/utils/context';
import { authFetch } from '@/utils/graphqlClient';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useMutation, UseMutationOptions } from 'react-query';

/**
 * Create a request which is authenticated from user session
 * @param documentNode document node which is used to make a request
 * @param options react query options
 * @param headers additional headers which will be sent with the request
 * @returns
 */
export const useAuthMutation = <TData, TVars, TError = unknown>(
  context: RequestContext,
  documentNode: TypedDocumentNode<TData, TVars>,
  options?: UseMutationOptions<TData, TError, TVars>
) => {
  return useMutation((payload: TVars) => authFetch(documentNode, payload as TVars, context), options);
};
