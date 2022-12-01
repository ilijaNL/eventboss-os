import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createContext, RequestContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { systemContract } from 'api-contracts';
import { execute } from '@/db';
import { createPublisher } from '../listeners';
import { v4 } from 'uuid';
import { appEvents } from '../app/domain';

const systemService = toServer(systemContract)<RequestContext>({
  create_app: {
    resolve: async ({ input, context }) => {
      const app_id = v4();
      const publisher = createPublisher(context);

      const result = publisher.emit({
        entity: { id: app_id, version: 0 },
        events: [appEvents.app_added({ id: app_id, name: input.name })],
      });

      await execute(publisher.getCommands());

      return {
        id: result.id,
        version: result.version,
      };
    },
  },
});

export const systemPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    createPlugin(systemService, {
      contextFactory: createContext,
    })
  );
};
