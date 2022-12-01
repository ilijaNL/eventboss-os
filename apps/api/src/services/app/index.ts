import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { AppContext, createAppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { appContract } from 'api-contracts';
import { encrypt } from '@/utils/encryption';
import { execute } from '@/db';
import { createPublisher } from '../listeners';
import { appEvents } from './domain';

const appService = toServer(appContract)<AppContext>({
  add_env: {
    resolve: async ({ context, input }) => {
      const rawValue = input.value;
      const encryptedValue = encrypt(input.value);
      const preview = rawValue.slice(0, rawValue.length < 15 ? 5 : 10);

      const publisher = createPublisher(context);

      publisher.emit({
        events: [appEvents.app_env_changed({ key: input.key, encryptedValue, preview })],
        entity: { id: context.app_id, version: 0 },
      });

      await execute(publisher.getCommands());

      return {
        success: true,
      };
    },
  },
});

export const appPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    createPlugin(appService, {
      contextFactory: createAppContext,
    })
  );
};
