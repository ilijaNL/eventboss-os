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
    json: 'Record<string, any>',
    jsonb: 'Record<string, any>',
  },
};

const url = `${process.env.HASURA_API as string}/v1/graphql`;

const ignorePatterns = ['!src/__generated__/**'];

const roleConfiguration: CodegenConfig['generates'] = ROLES.reduce((agg, role) => {
  const output = `./src/__generated__/${role.extension}-documents.ts`;
  return {
    ...agg,
    [output]: {
      documents: [`src/**/*.${role.extension}.graphql`, ...ignorePatterns],
      schema: [
        {
          [url]: {
            headers: {
              'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET as string,
              'x-hasura-role': role.role,
              'x-hasura-use-backend-only-permissions': 'true',
            },
          },
        },
      ],
      // preset: 'import-types-preset',
      // presetConfig: {
      //   typesPath: './graphql-types',
      // },
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: sharedConfig,
    },
  };
}, {} as CodegenConfig['generates']);

const config: CodegenConfig = {
  generates: roleConfiguration,
};

export default config;
