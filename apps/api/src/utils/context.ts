import { FastifyReply, FastifyRequest } from 'fastify';
import createHttpError from 'http-errors';
import { DBAppContext } from './graphql/graphql-client';

export interface RequestContext {
  request: FastifyRequest;
  reply: FastifyReply;
}

export interface AppContext extends RequestContext {
  app_id: string;
  graphqlContext: DBAppContext;
}

export const createContext = (req: FastifyRequest, reply: FastifyReply): RequestContext => {
  return {
    reply: reply,
    request: req,
  };
};

export const createAppContext = (req: FastifyRequest, reply: FastifyReply): AppContext => {
  const baseContext = createContext(req, reply);
  const app_id = req.headers['x-app-id'] as string;

  if (!app_id) {
    throw new createHttpError.Forbidden();
  }

  return {
    ...baseContext,
    app_id,
    graphqlContext: {
      app_id: app_id,
      role: 'app',
    },
  };
};
