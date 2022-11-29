import { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv-safe').config({
  allowEmptyValues: true,
});

const ROLES = [
  {
    role: 'admin',
    extension: 'admin',
  },
  {
    role: 'app',
    extension: 'app',
  },
  // {
  //   role: 'anonymous',
  //   extension: 'public',
  // },
];

const sharedConfig = {
  skipTypename: true,
  avoidOptionals: {
    field: true,
    inputValue: false,
    object: true,
    defaultValue: false,
  },
  // avoidOptionals: true,
  exposeQueryKeys: true,
  scalars: {
    uuid: 'string',
    UUID: 'string',
    EmailAddress: 'string',
    JSONObject: 'Record<string, any>',
    bigint: 'number',
    timestamptz: 'string',
    timestamp: 'string',
    interval: 'string',
    time: 'string',
    Date: 'Date',
    json: 'Record<string, any> | Array<any>',
    jsonb: 'Record<string, any> | Array<any>',
  },
};

const url = process.env.NEXT_APP_GRAPHQL as string;
const adminSecret = 'admin12345';

const ignorePatterns = ['!src/__generated__/**'];

const roleConfiguration: CodegenConfig['generates'] = ROLES.reduce((agg, role) => {
  const output = `./src/__generated__/${role.extension}/documents.ts`;
  return {
    ...agg,
    [output]: {
      documents: [`src/**/*.common.graphql`, `src/**/*.${role.extension}.graphql`, ...ignorePatterns],
      schema: [
        {
          [url]: {
            headers: {
              'x-hasura-admin-secret': adminSecret,
              'x-hasura-role': role.role,
            },
          },
        },
      ],
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: { ...sharedConfig, documentMode: 'graphQLTag' },
    },
  };
}, {} as CodegenConfig['generates']);

const config: CodegenConfig = {
  generates: roleConfiguration,
};

export default config;
