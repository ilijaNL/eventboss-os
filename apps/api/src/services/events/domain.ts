import { EventData, eventsContract } from 'api-contracts';
import { createEventsFactory, createActionFromEvent, Effects, InferEvents } from '@/utils/ddd';
import { CompiledQuery } from 'kysely';
import db from '@/db';
import fastJson from 'fast-json-stable-stringify';

const eventEvents = createEventsFactory({
  event_created: EventData,
  event_updated: EventData,
  action_assigned: eventsContract.assign_action.input,
});

export type EventEvents = InferEvents<typeof eventEvents>;

export const eventEffects: Effects<EventEvents, CompiledQuery[], { app_id: string }> = {
  event_created: (e, ctx) => [
    db
      .insertInto('app.events')
      .values({
        name: e.data.name,
        app_id: ctx.app_id,
        extra_data: fastJson({}),
        slug: e.data.slug,
        id: e._agg_id,
      })
      .compile(),
  ],
  action_assigned: (e, _) => [
    db
      .insertInto('app.event_actions')
      .values({
        id: e._agg_id,
        action_id: e.data.action_id,
        event_id: e.data.event_id,
      })
      .compile(),
  ],
  event_updated: (e, context) => [
    db
      .updateTable('app.events')
      .set({
        name: e.data.name,
        slug: e.data.slug,
      })
      .where('id', '=', e._agg_id)
      .where('app_id', '=', context.app_id)
      .compile(),
  ],
};

export const create_event = createActionFromEvent(eventEvents, 'event_created');
export const edit_event = createActionFromEvent(eventEvents, 'event_updated');
export const assign_action = createActionFromEvent(eventEvents, 'action_assigned');
