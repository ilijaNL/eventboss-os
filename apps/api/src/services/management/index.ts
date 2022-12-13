import { FastifyPluginAsync } from 'fastify';
import { actionsPlugin } from './actions';
import { eventService } from './events';
import { appPlugin } from './app';
import { systemPlugin } from './system';

const managementService: FastifyPluginAsync<{}> = async (fastify) => {
  // these are app specific
  fastify.register(eventService, { prefix: '/events' });
  fastify.register(actionsPlugin, { prefix: '/activities' });
  fastify.register(appPlugin, { prefix: '/app' });

  // this is not app specific
  fastify.register(systemPlugin);

  fastify.post('/test', async (req) => {
    fastify.log.info(req.headers);
    return {
      success: true,
    };
  });
};

export default managementService;
