import { Static, Type } from '@sinclair/typebox';
import { createContract } from '@typed-doc/core';
import { Result, Success } from './common';
import { Uuid } from './schema';

export type ActivityConfigType = Static<typeof ActivityConfig>;

export const ActivityConfig = Type.Union([
  Type.Object({
    type: Type.Literal('webhook'),
    config: Type.Object({
      endpoint: Type.String({ minLength: 6 }),
      headers: Type.Record(Type.String({ maxLength: 128 }), Type.String({ maxLength: 256 })),
    }),
  }),
  Type.Object({
    type: Type.Literal('system'),
    config: Type.Object({}),
  }),
]);

export const ActivityInfo = Type.Object({
  slug: Type.String({ minLength: 3, maxLength: 128 }),
  name: Type.String({ minLength: 2, maxLength: 256 }),
  config: ActivityConfig,
  retry_limit: Type.Number({ minimum: 0, maximum: 6 }),
  retry_delay: Type.Number({ minimum: 1, maximum: 60 * 60 }),
  retry_backoff: Type.Boolean(),
  // in seconds
  run_after: Type.Number({ minimum: 0, maximum: 10 }),
  // how long for this job to expire
  expire_in_seconds: Type.Number({ minimum: 5, maximum: 60 }),
});

export const activityContract = createContract({
  create: {
    input: ActivityInfo,
    type: 'mutation',
    output: Result,
  },
  edit: {
    input: Type.Object({
      activity_id: Uuid,
      info: ActivityInfo,
    }),
    type: 'mutation',
    output: Success,
  },
});
