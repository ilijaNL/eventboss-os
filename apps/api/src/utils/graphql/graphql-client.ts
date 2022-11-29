import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';
import { IncomingHttpHeaders } from 'http';
import { match } from 'ts-pattern';
import { request } from 'undici';
import { addAll, GraphqlCommand } from './builder';
import fastJson from 'fast-json-stable-stringify';

const URL = `${process.env.HASURA_API}/v1/graphql`;
const ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET as string;

export type DBAdminContext = {
  role: 'admin';
};

export const adminContext: DBAdminContext = { role: 'admin' };

export type DBAppContext = {
  role: 'app';
  app_id: string;
};

type DBContext = DBAdminContext | DBAppContext;

export async function execute<TData, TVariables>(
  context: DBContext,
  doc: TypedDocumentNode<TData, TVariables>,
  variables: TVariables
): Promise<TData> {
  const query = print(doc);
  const requestBody = fastJson({ query, variables });

  const headers: IncomingHttpHeaders = match(context)
    .with({ role: 'admin' }, (context) => ({
      'x-hasura-role': context.role,
    }))
    .with({ role: 'app' }, (context) => ({
      'x-hasura-role': context.role,
      'x-hasura-app-id': context.app_id,
    }))
    .exhaustive();

  const { body } = await request(URL, {
    method: 'POST',
    body: requestBody,
    headers: {
      'x-hasura-admin-secret': ADMIN_SECRET,
      ['x-hasura-use-backend-only-permissions']: 'true',
      ...headers,
    },
    headersTimeout: 20000, // in milliseconds
  });

  const { data, errors } = await body.json();

  if (errors) {
    const { message } = errors[0] || 'Error..';

    throw new Error(message);
  }

  return data;
}

export async function executeSerial(
  authContext: DBContext,
  cmds: Array<GraphqlCommand | Array<GraphqlCommand>>
): Promise<void> {
  const allItems = cmds.flat();
  if (allItems.length === 0) {
    return;
  }
  const command = addAll(allItems);
  await execute(authContext, command.document, command.variables ?? {});
}
