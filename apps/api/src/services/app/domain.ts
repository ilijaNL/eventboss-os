import db from '@/db';
import { createEventsFactory, InferEvents, Effects } from '@/utils/ddd';
import { Type } from '@sinclair/typebox';
import { CompiledQuery } from 'kysely';

const events = createEventsFactory({
  app_added: Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String({ minLength: 3 }),
  }),
});

export type AppEvents = InferEvents<typeof events>;

export const appEffects: Effects<AppEvents, Array<CompiledQuery>, { app_id: string }> = {
  app_added: (evt, ctx) => [
    db
      .insertInto('app.apps')
      .values({ name: evt.data.name, id: ctx.app_id, extra_data: JSON.stringify({}) })
      .compile(),
  ],
};
