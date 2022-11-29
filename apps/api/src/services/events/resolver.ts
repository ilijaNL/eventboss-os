import { eventsContract } from 'api-contracts';
import { toServer } from '@typed-doc/core';
import { createExecutor } from '@/db';
import { execute } from '@/utils/graphql/graphql-client';
import { AppContext } from '@/utils/context';
import { GetEventDocument, GetActionDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { v4 } from 'uuid';
import { assign_action, create_event, edit_event, eventEffects } from './domain';
import { emitEvent } from './emit';

export const eventsServer = toServer(eventsContract)<AppContext>({
  create: {
    resolve: async ({ context, input }) => {
      const event_id = v4();
      const executor = createExecutor(context);

      const new_event = executor.add({
        result: create_event(null, input),
        effects: eventEffects,
        entity: { id: event_id, version: 0 },
      });

      await executor.commit();

      return {
        id: new_event.id,
        version: new_event.version,
      };
    },
  },
  assign_action: {
    resolve: async ({ context, input }) => {
      const [action, event] = await Promise.all([
        execute(context.graphqlContext, GetActionDocument, { action_id: input.action_id }).then(
          (d) => d.app_actions_by_pk
        ),
        execute(context.graphqlContext, GetEventDocument, { event_id: input.event_id }).then((d) => d.app_events_by_pk),
      ]);

      if (!action || !event) {
        throw new createHttpError.NotFound();
      }

      const executor = createExecutor(context);

      executor.add({
        result: assign_action(null, input),
        effects: eventEffects,
        entity: { id: v4(), version: 0 },
      });

      await executor.commit();

      return {
        success: true,
      };
    },
  },
  edit: {
    resolve: async ({ context, input }) => {
      const event = await execute(context.graphqlContext, GetEventDocument, { event_id: input.event_id }).then(
        (d) => d.app_events_by_pk
      );

      if (!event) {
        throw new createHttpError.NotFound();
      }

      const executor = createExecutor(context);

      executor.add({
        result: edit_event(null, input.info),
        effects: eventEffects,
        entity: { id: input.event_id, version: 0 },
      });

      await executor.commit();

      return {
        success: true,
      };
    },
  },
  send: {
    resolve: async ({ context, input }) => {
      await emitEvent(context, input);
      return {
        success: true,
      };
    },
  },
});
