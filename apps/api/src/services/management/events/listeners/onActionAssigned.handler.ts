import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { eventEvents } from '../domain';
import { AppContext } from '@/utils/context';
import db from '@/db';

export default createEventListener(eventEvents.activity_assigned)<AppContext, CompiledQuery>(({ event: e }) => {
  return db
    .insertInto('eventboss.event_activities')
    .values({
      id: e._agg_id,
      activity_id: e.data.activity_id,
      event_id: e.data.event_id,
    })
    .compile();
});
