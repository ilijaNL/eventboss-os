import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { eventEvents } from '../domain';
import { AppContext } from '@/utils/context';
import db from '@/db';

export default createEventListener(eventEvents.event_updated)<AppContext, CompiledQuery>(({ ctx, event: e }) => {
  return db
    .updateTable('app.events')
    .set({
      name: e.data.name,
      slug: e.data.slug,
    })
    .where('id', '=', e._agg_id)
    .where('app_id', '=', ctx.app_id)
    .compile();
});
