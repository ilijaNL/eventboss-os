import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { eventsServer } from './resolver';
import { eventHandlers, TJobEventPayload } from './event-processor';
import { createWorker } from './job-worker';

export const eventService: FastifyPluginAsync = async (fastify) => {
  const subscription = createWorker({
    pgBoss: fastify.pg_boss,
    fetchSize: 200,
    maxConcurrency: 1000,
    poolInternvalInMs: 1500,
    handler: async ({ data }) => {
      const event = data as TJobEventPayload;
      const handler = eventHandlers[event.type];

      if (!handler) {
        throw new Error('internal: type not found');
      }

      return handler(event as any, fastify);
    },
  });

  fastify.addHook('onClose', async () => {
    await subscription.stop();
  });

  fastify.register(
    createPlugin(eventsServer, {
      contextFactory: createAppContext,
    })
  );
};
