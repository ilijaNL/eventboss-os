import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { actionEvents } from '../domain';
import fastJson from 'fast-json-stable-stringify';
import db from '@/db';
import { AppContext } from '@/utils/context';

export default createEventListener(actionEvents.action_updated)<AppContext, CompiledQuery>(({ ctx, event: e }) => {
  return db
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
    .compile();
});
