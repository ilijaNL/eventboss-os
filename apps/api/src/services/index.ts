// import { createBossHandler } from '@/utils/pg-boss';
import { FastifyPluginAsync } from 'fastify';
import { actionsPlugin } from './actions';
import { eventService } from './events';
import { appPlugin } from './app';

const platformService: FastifyPluginAsync<{}> = async (fastify) => {
  fastify.register(eventService, { prefix: '/events' });
  fastify.register(actionsPlugin, { prefix: '/actions' });
  fastify.register(appPlugin, { prefix: '/app' });

  fastify.post('/test', async (req) => {
    fastify.log.info(req.headers);
    return {
      success: true,
    };
  });
};

export default platformService;
