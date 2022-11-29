import env from '@beam-australia/react-env';

type EnvKeys = 'GRAPHQL' | 'API' | 'HASURA_GRAPHQL_ADMIN_SECRET';

export default function getConfig(key: EnvKeys) {
  return env(key);
}

export const BRAND_NAME = 'EventBoss';
