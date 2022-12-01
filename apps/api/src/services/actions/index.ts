import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext, AppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { actionContract } from 'api-contracts';
import { v4 } from 'uuid';
import { execute } from '@/utils/graphql/graphql-client';
import { GetActionDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { execute as dbExec } from '@/db';
import { create_action, update_action } from './domain';
import { createPublisher } from '../listeners';

const actionService = toServer(actionContract)<AppContext>({
  create: {
    resolve: async ({ context, input }) => {
      const action_id = v4();
      const publisher = createPublisher(context);

      publisher.emit({
        events: create_action(null, input).events,
        entity: { id: action_id, version: 0 },
      });

      await dbExec(publisher.getCommands());

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

      const publisher = createPublisher(context);

      publisher.emit({
        entity: { id: action_id, version: 0 },
        events: update_action(null, info).events,
      });

      await dbExec(publisher.getCommands());

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
