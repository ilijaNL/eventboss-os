import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { eventEvents } from '../domain';
import { AppContext } from '@/utils/context';
import db from '@/db';

export default createEventListener(eventEvents.action_assigned)<AppContext, CompiledQuery>(({ event: e }) => {
  return db
    .insertInto('app.event_actions')
    .values({
      id: e._agg_id,
      action_id: e.data.action_id,
      event_id: e.data.event_id,
    })
    .compile();
});
