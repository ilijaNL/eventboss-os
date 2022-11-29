import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext, AppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { actionContract } from 'api-contracts';
import { v4 } from 'uuid';
import { execute } from '@/utils/graphql/graphql-client';
import { GetActionDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { createExecutor } from '@/db';
import { actionEffects, create_action, update_action } from './domain';

const actionService = toServer(actionContract)<AppContext>({
  create: {
    resolve: async ({ context, input }) => {
      const action_id = v4();

      const executor = createExecutor(context);

      executor.add({
        result: create_action(null, input),
        effects: actionEffects,
        entity: { id: action_id, version: 0 },
      });

      await executor.commit();

      return {
        id: action_id,
        version: 1,
      };
    },
  },
  edit: {
    resolve: async ({ context, input: { action_id, info } }) => {
      const result = await execute(context.graphqlContext, GetActionDocument, { action_id }).then(
        (d) => d.app_actions_by_pk
      );

      if (!result) {
        throw new createHttpError.NotFound();
      }

      const executor = createExecutor(context);

      executor.add({
        result: update_action(null, info),
        effects: actionEffects,
        entity: { id: result.id, version: 0 },
      });

      await executor.commit();

      return {
        success: true,
      };
    },
  },
});

export const actionsPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    createPlugin(actionService, {
      contextFactory: createAppContext,
    })
  );
};
