import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { eventEvents } from '../domain';
import { AppContext } from '@/utils/context';
import fastJson from 'fast-json-stable-stringify';
import db from '@/db';

export default createEventListener(eventEvents.event_created)<AppContext, CompiledQuery>(({ ctx, event: e }) => {
  return db
    .insertInto('app.events')
    .values({
      name: e.data.name,
      app_id: ctx.app_id,
      extra_data: fastJson({}),
      slug: e.data.slug,
      id: e._agg_id,
    })
    .compile();
});
