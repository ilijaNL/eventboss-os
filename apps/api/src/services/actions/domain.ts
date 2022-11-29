import { ActionInfo } from 'api-contracts';
import { createActionFromEvent, createEventsFactory, Effects, InferEvents } from '@/utils/ddd';
import { CompiledQuery } from 'kysely';
import db from '@/db';
import fastJson from 'fast-json-stable-stringify';

const actionEvents = createEventsFactory({
  action_created: ActionInfo,
  action_updated: ActionInfo,
});

export type ActionEvents = InferEvents<typeof actionEvents>;

export const actionEffects: Effects<ActionEvents, CompiledQuery[], { app_id: string }> = {
  action_created: (e, ctx) => [
    db
      .insertInto('app.actions')
      .values({
        id: e._agg_id,
        extra_data: fastJson({}),
        app_id: ctx.app_id,
        name: e.data.name,
        retry_backoff: e.data.retry_backoff,
        retry_delay: e.data.retry_delay,
        retry_limit: e.data.retry_limit,
        run_after: e.data.run_after,
        slug: e.data.slug,
        type: e.data.config.type,
        type_configuration: fastJson(e.data.config.config),
      })
      .compile(),
  ],
  action_updated: (e, ctx) => [
    db
      .updateTable('app.actions')
      .set({
        name: e.data.name,
        retry_backoff: e.data.retry_backoff,
        retry_delay: e.data.retry_delay,
        retry_limit: e.data.retry_limit,
        run_after: e.data.run_after,
        slug: e.data.slug,
        type: e.data.config.type,
        type_configuration: fastJson(e.data.config.config),
      })
      .where('app.actions.id', '=', e._agg_id)
      .where('app.actions.app_id', '=', ctx.app_id)
      .compile(),
  ],
};

export const create_action = createActionFromEvent(actionEvents, 'action_created');
export const update_action = createActionFromEvent(actionEvents, 'action_updated');
