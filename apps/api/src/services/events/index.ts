import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { eventsServer } from './resolver';
import { eventHandlers, TJobEventPayload } from './event-processor';
import { createWorker } from './worker';
import { expireJobsAndFail, expireJobsAndRetry, getScheduledJobs, Job } from './jobs';

export const eventService: FastifyPluginAsync = async (fastify) => {
  const subscription = createWorker<Job<TJobEventPayload, any>>({
    fetch: getScheduledJobs,
    fetchSize: 100,
    maxConcurrency: 1000,
    poolInternvalInMs: 1500,
    handler: async ({ data }) => {
      const event = data.job;
      const handler = eventHandlers[event.type];

      if (!handler) {
        throw new Error('internal: type not found');
      }

      return handler(event as any, fastify);
    },
  });

  // this should be moved to a seperate job
  setInterval(expireJobsAndRetry, 15 * 1000);
  setInterval(expireJobsAndFail, 15 * 1000);

  fastify.addHook('onClose', async () => {
    await subscription.stop();
  });

  fastify.register(
    createPlugin(eventsServer, {
      contextFactory: createAppContext,
    })
  );
};
