import { emitEvent } from '@/utils/eventboss/event';
import { getTasksByActivity, completeTask, failTask } from '@/utils/eventboss/tasks';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';

declare module 'fastify' {
  interface FastifyRequest {
    app_id: string;
  }
}

/**
 * Service which is used by the SDK's
 * @param fastify
 */
export const sdkService: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.decorateRequest('app_id', '');

  fastify.addHook('onRequest', async (request) => {
    // get app_id from headers
    request.app_id = request.headers['x-app-id'] as string;
  });

  /**
   * Send event
   */
  fastify.post(
    '/send',
    {
      schema: {
        body: Type.Object({
          event_slug: Type.String(),
          payload: Type.Any(),
        }),
      },
    },
    async (req, reply) => {
      const app_id = req.app_id;
      const event = req.body;
      await emitEvent({ app_id: app_id, event_slug: event.event_slug, payload: event.payload });
      return reply.send('ok');
    }
  );

  /**
   * Fetch events for an activity
   */
  fastify.get(
    '/pop/:activity_id',
    {
      schema: {
        params: Type.Object({
          activity_id: Type.String({ format: 'uuid' }),
        }),
        querystring: Type.Object({
          amount: Type.Number({ minimum: 1, maximum: 100 }),
        }),
      },
    },
    async (req) => {
      const { activity_id } = req.params;
      const { amount } = req.query;

      const tasks = await getTasksByActivity({ activity_id: activity_id, amount: amount, app_id: req.app_id });

      return {
        tasks: tasks,
      };
    }
  );

  /**
   * Resolve a single task
   * for optimilaisation use a message bus (can be postgres or rabbitmq)
   */
  fastify.post(
    '/resolve/:task_id',
    {
      schema: {
        params: Type.Object({
          task_id: Type.String({ format: 'uuid' }),
        }),
        body: Type.Object({
          status: Type.Union([Type.Literal('succeed'), Type.Literal('failed')]),
          response: Type.Any(),
        }),
      },
    },
    async (request, reply) => {
      const { task_id } = request.params;
      const app_id = request.app_id;
      const event_result = request.body;

      if (event_result.status === 'succeed') {
        await completeTask(app_id, task_id, event_result.response);
      } else if (event_result.status === 'failed') {
        await failTask(app_id, task_id, event_result.response);
      }

      return reply.send('ok');
    }
  );
};
