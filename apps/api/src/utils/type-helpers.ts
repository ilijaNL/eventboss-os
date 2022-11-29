import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type InferVariables<T> = T extends TypedDocumentNode<any, infer Var> ? Var : never;
export type InferResult<T> = T extends TypedDocumentNode<infer Result, any> ? Result : never;
