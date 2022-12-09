import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { eventsServer } from './resolver';

export const eventService: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    createPlugin(eventsServer, {
      contextFactory: createAppContext,
    })
  );
};
