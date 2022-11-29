import getConfig from '@/config';

interface _RequestContext {
  role: 'app' | 'admin';
}

export interface AppReqContext extends _RequestContext {
  role: 'app';
  app_id: string;
}

export interface UserReqContext extends _RequestContext {
  role: 'admin';
}

export type RequestContext = UserReqContext | AppReqContext;

export function getAuthHeaders(context: RequestContext) {
  return {
    'x-hasura-admin-secret': getConfig('HASURA_GRAPHQL_ADMIN_SECRET'),
    'x-hasura-role': context.role,
    ...('app_id' in context
      ? {
          'x-hasura-app-id': context.app_id,
          'x-app-id': context.app_id,
        }
      : {}),
  };
}
