import { FastifyPluginAsync } from 'fastify';
import { actionsPlugin } from './actions';
import { eventService } from './events';
import { appPlugin } from './app';
import { systemPlugin } from './system';

const platformService: FastifyPluginAsync<{}> = async (fastify) => {
  fastify.register(eventService, { prefix: '/events' });
  fastify.register(actionsPlugin, { prefix: '/activities' });
  fastify.register(appPlugin, { prefix: '/app' });
  fastify.register(systemPlugin, { prefix: '/s' });

  fastify.post('/test', async (req) => {
    fastify.log.info(req.headers);
    return {
      success: true,
    };
  });
};

export default platformService;
