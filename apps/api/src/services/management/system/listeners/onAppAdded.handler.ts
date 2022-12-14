import db from '@/db';
import { appEvents } from '@/services/management/app/domain';
import { RequestContext } from '@/utils/context';
import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';

export default createEventListener(appEvents.app_added)<RequestContext, CompiledQuery>(({ event }) => {
  return db
    .insertInto('eventboss.apps')
    .values({ name: event.data.name, id: event._agg_id, extra_data: JSON.stringify({}) })
    .compile();
});
