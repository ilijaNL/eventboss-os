import { Static, TSchema, TObject } from '@sinclair/typebox';

// Contract stuff
export type MethodType = 'query' | 'mutation';

export interface RPC<Type extends MethodType, Input extends TObject, Output extends TObject> {
  type: Type;
  input?: Input;
  output: Output;
}

export interface InputContract {
  [method: string]: RPC<MethodType, TObject, TObject>;
}

export interface ContractType<Type extends MethodType = MethodType, Input = any, Output = any> {
  input: Input;
  output: Output;
  type: Type;
}

export type InferData<T extends ContractMethod> = T['__inferedData'];

export type ContractMethod<
  Method = string,
  T extends RPC<any, TObject, TObject> = RPC<MethodType, TObject, TObject>,
  TInput = T['input']
> = {
  method: Method;
  __inferedData: ContractType<T['type'], TInput extends TSchema ? Static<TInput> : undefined, Static<T['output']>>;
} & T;

export type Contract<T extends InputContract = InputContract> = {
  [P in keyof T]: ContractMethod<P, T[P]> & T[P];
};

interface ServerProcedure<TContext, Extensions, T extends ContractMethod> {
  resolve: ResolveFunction<TContext, InferData<T>['input'], InferData<T>['output']>;
  extensions: Extensions;
}

interface ContractImplProcedure<TContext, T extends ContractMethod, Extensions = any> {
  extensions?: Extensions;
  resolve: ResolveFunction<TContext, InferData<T>['input'], InferData<T>['output']>;
}

export type ContractImpl<TContext, Extensions, TC extends Contract> = {
  [P in keyof TC]: ContractImplProcedure<TContext, TC[P], Extensions>;
};

export type Server<TContext, Extensions, TC extends Contract> = {
  [P in keyof TC]: ServerProcedure<TContext, Extensions, TC[P]> & TC[P];
};

export interface ResolveFunction<Context = any, Input = any, Output = any> {
  (params: { context: Context; input: Input }): Promise<Output> | Output;
}

// client
export type TypedDocument<Result, Input, Method = string, Type extends MethodType = MethodType> = {
  method: Method;
  input?: Input;
  type: Type;
  /**
   * This type is used to ensure that the variables you pass in to the query are assignable to Variables
   * and that the Result is assignable to whatever you pass your result to. The method is never actually
   * implemented, but the type is valid because we list it as optional
   */
  __apiType?: (variables: Input) => Result;
};

export function createContract<T extends InputContract>(specification: T): Contract<T> {
  const contract = (Object.keys(specification) as Array<keyof T>).reduce((agg, key) => {
    agg[key] = {
      ...specification[key],
      method: key,
    } as ContractMethod<typeof key, T[typeof key]>;

    return agg;
  }, {} as Contract<T>);

  return contract;
}

export function toServer<T extends Contract>(contract: T) {
  return function implement<Context, Extensions extends Record<string, any> = {}>(
    impl: ContractImpl<Context, Extensions, T>
  ): Server<Context, Extensions, T> {
    return (Object.keys(impl) as Array<Extract<keyof T, string>>).reduce((agg, key) => {
      agg[key] = {
        ...impl[key],
        ...contract[key],
        extensions: impl[key].extensions ?? {},
      };
      return agg;
    }, {} as Server<Context, Extensions, T>);
  };
}

export function createDocuments<TContract extends Contract<InputContract>>() {
  function factory<T extends keyof TContract, TData extends ContractType = InferData<TContract[T]>>(
    method: T,
    payload: undefined extends TData['input']
      ? {
          type: TData['type'];
        }
      : {
          type: TData['type'];
          input: TData['input'];
        }
  ): TypedDocument<TData['output'], TData['input'], T, TData['type']> {
    return {
      ...payload,
      method: method,
    };
  }

  return factory;
}
