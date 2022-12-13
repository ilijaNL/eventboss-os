import { toServer } from '@typed-doc/core';
import { createPlugin } from '@/plugins/fastify-typed-doc';
import { createAppContext, AppContext } from '@/utils/context';
import { FastifyPluginAsync } from 'fastify';
import { activityContract } from 'api-contracts';
import { v4 } from 'uuid';
import { execute } from '@/utils/graphql/graphql-client';
import { GetActivityDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { execute as dbExec } from '@/db';
import { create_activity, update_activity } from './domain';
import { createPublisher } from '../listeners';

const actionService = toServer(activityContract)<AppContext>({
  create: {
    resolve: async ({ context, input }) => {
      const action_id = v4();
      const publisher = createPublisher(context);

      publisher.emit({
        events: create_activity(null, input).events,
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
    resolve: async ({ context, input: { activity_id, info } }) => {
      const result = await execute(context.graphqlContext, GetActivityDocument, { activity_id }).then(
        (d) => d.eventboss_activities_by_pk
      );

      if (!result) {
        throw new createHttpError.NotFound();
      }

      const publisher = createPublisher(context);

      publisher.emit({
        entity: { id: activity_id, version: 0 },
        events: update_activity(null, info).events,
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
