import { Server, Contract } from '@typed-doc/core';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';

type Options<Context> = {
  contextFactory: (req: FastifyRequest, reply: FastifyReply) => Context | Promise<Context>;
};

/**
 * Plugin which creates fastify routes from a typed contract
 * @param server
 * @param options
 * @returns
 */
export const createPlugin = <TContext, TExtensions, T extends Contract>(
  server: Server<TContext, TExtensions, T>,
  options: Options<TContext>
): FastifyPluginAsync<{}> => {
  return async function register(fastify) {
    // registery mutations
    (Object.entries(server) as [string, typeof server[keyof T]][])
      .filter(([, spec]) => spec.type === 'mutation')
      .forEach(([method, spec]) => {
        fastify.post(
          `/${method}`,
          { ...spec.extensions, schema: { body: spec.input, response: { '2xx': spec.output } } },
          async (req, resp) => {
            const ctx = await Promise.resolve(options.contextFactory(req, resp));
            return spec.resolve({ context: ctx, input: req.body as any });
          }
        );
      });

    // registery queries
    (Object.entries(server) as [string, typeof server[keyof T]][])
      .filter(([, spec]) => spec.type === 'query')
      .forEach(([method, spec]) => {
        fastify.get(
          `/${method}`,
          { schema: { querystring: spec.input, response: { '2xx': spec.output } } },
          async (req, resp) => {
            const ctx = await Promise.resolve(options.contextFactory(req, resp));
            return spec.resolve({ context: ctx, input: req.query as any });
          }
        );
      });
  };
};
