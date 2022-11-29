import type { Contract, InferData, InputContract, ContractDef } from '@typed-doc/core';
import { useMutation as _useMutation, UseMutationOptions, useQuery as _useQuery, UseQueryOptions } from 'react-query';
import { getAuthHeaders, RequestContext } from './context';

type Payload<T extends ContractDef> = {
  type: T['type'];
  input: T['input'];
};

export function createAuthClient<TContract extends Contract<InputContract>>(_contract: TContract, baseUrl: string) {
  const executeFn = createRPCClient(_contract, baseUrl);

  return async function execute<T extends keyof TContract, TData extends ContractDef = InferData<TContract[T]>>(
    context: RequestContext,
    method: T,
    payload: Payload<TData>
  ) {
    const headers = getAuthHeaders(context);
    return executeFn(method, payload, headers);
  };
}

export function createRPCClient<TContract extends Contract<InputContract>>(_contract: TContract, baseUrl: string) {
  return async function execute<T extends keyof TContract, TData extends ContractDef = InferData<TContract[T]>>(
    method: T,
    payload: Payload<TData>,
    headers?: Record<string, any>
  ): Promise<TData['output']> {
    let request: Promise<Response>;
    // validate request

    const fetchUrl = new URL(method as string, baseUrl + '/');

    if (payload.type === 'mutation') {
      request = fetch(fetchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(payload.input ?? {}),
      });
    } else {
      Object.entries(payload.input ?? {}).forEach(([key, value]) => {
        fetchUrl.searchParams.set(key, value as string);
      });

      request = fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    }

    const response = await request;

    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    return response.json();
  };
}

export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>;

type MutationKeys<T extends Contract<InputContract>> = keyof PickByValue<T, { type: 'mutation' }>;
type QueryKeys<T extends Contract<InputContract>> = keyof PickByValue<T, { type: 'query' }>;

/**
 * Create hooks which are authenticated
 * @param _contract
 * @param baseUrl
 * @returns
 */
export function createAuthHooks<T extends Contract<InputContract>>(_contract: T, baseUrl: string) {
  const client = createAuthClient(_contract, baseUrl);

  function useMutation<TMethod extends MutationKeys<T>, TData extends ContractDef = InferData<T[TMethod]>>(
    context: RequestContext,
    method: TMethod,
    options?: Omit<UseMutationOptions<TData['output'], any, Payload<TData>['input']>, 'mutationFn'>
  ) {
    return _useMutation(async (input) => {
      return client(context, method, { type: 'mutation', input: input });
    }, options);
  }

  function useQuery<TMethod extends QueryKeys<T>, TData extends ContractDef = InferData<T[TMethod]>>(
    context: RequestContext,
    method: TMethod,
    input: Payload<TData>['input'],
    options?: Omit<UseQueryOptions<TData['output']>, 'queryKey' | 'queryFn'>
  ) {
    return _useQuery(
      [context, baseUrl, method],
      async () => {
        return client(context, method, { type: 'query', input: input });
      },
      options
    );
  }

  return {
    useMutation,
    useQuery,
  };
}
