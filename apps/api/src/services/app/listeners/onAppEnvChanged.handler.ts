import db from '@/db';
import { AppContext } from '@/utils/context';
import { createEventListener } from '@/utils/event-publisher';
import { CompiledQuery } from 'kysely';
import { appEvents } from '../domain';

export default createEventListener(appEvents.app_env_changed)<AppContext, CompiledQuery>(({ ctx, event }) => {
  return db
    .insertInto('app.environments')
    .values({ key: event.data.key, preview: event.data.preview, app_id: ctx.app_id, value: event.data.encryptedValue })
    .onConflict((oc) =>
      oc
        .constraint('environments_app_id_key_key')
        .doUpdateSet({ value: event.data.encryptedValue, preview: event.data.preview })
    )
    .compile();
});
