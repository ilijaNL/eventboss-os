import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { AppContext, createAppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { appSettings } from 'api-contracts';
import { encrypt } from '@/utils/encryption';
import db from '@/db';

const appService = toServer(appSettings)<AppContext>({
  add_env: {
    resolve: async ({ context, input }) => {
      const rawValue = input.value;
      const encryptedValue = encrypt(input.value);
      const preview = rawValue.slice(0, rawValue.length < 15 ? 5 : 10);

      await db
        .insertInto('app.environments')
        .values({ key: input.key, preview: preview, app_id: context.app_id, value: encryptedValue })
        .onConflict((oc) =>
          oc.constraint('environments_app_id_key_key').doUpdateSet({ value: encryptedValue, preview: preview })
        )
        .execute();

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
