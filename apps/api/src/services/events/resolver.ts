import { eventsContract } from 'api-contracts';
import { toServer } from '@typed-doc/core';
import { execute } from '@/utils/graphql/graphql-client';
import { execute as execDb } from '@/db';
import { AppContext } from '@/utils/context';
import { GetEventDocument, GetActionDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { v4 } from 'uuid';
import { assign_action, create_event, edit_event } from './domain';
import { dispatchEvent } from './emit';
import { createPublisher } from '../listeners';

export const eventsServer = toServer(eventsContract)<AppContext>({
  create: {
    resolve: async ({ context, input }) => {
      const event_id = v4();
      const publisher = createPublisher(context);
      const new_event = publisher.emit({
        events: create_event(null, input).events,
        entity: { id: event_id, version: 0 },
      });

      await execDb(publisher.getCommands());

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

      const publisher = createPublisher(context);

      publisher.emit({
        events: assign_action(null, input).events,
        entity: { id: v4(), version: 0 },
      });

      await execDb(publisher.getCommands());

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

      const publisher = createPublisher(context);

      publisher.emit({
        events: edit_event(null, input.info).events,
        entity: { id: input.event_id, version: 0 },
      });

      await execDb(publisher.getCommands());

      return {
        success: true,
      };
    },
  },
  send: {
    resolve: async ({ context, input }) => {
      await dispatchEvent(context, input);
      return {
        success: true,
      };
    },
  },
});
