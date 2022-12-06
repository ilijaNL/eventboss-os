import { Static, Type } from '@sinclair/typebox';
import { createContract } from '@typed-doc/core';
import { Result, Success } from './common';
import { Uuid } from './schema';

export type ActionTypes = Static<typeof ActionConfigs>;

export const ActionConfigs = Type.Union([
  Type.Object({
    type: Type.Literal('webhook'),
    config: Type.Object({
      endpoint: Type.String({ minLength: 6 }),
      headers: Type.Record(Type.String({ maxLength: 128 }), Type.String({ maxLength: 256 })),
    }),
  }),
  Type.Object({
    type: Type.Literal('test'),
    config: Type.Object({}),
  }),
]);

export const ActionInfo = Type.Object({
  slug: Type.String({ minLength: 3, maxLength: 128 }),
  name: Type.String({ minLength: 2, maxLength: 256 }),
  config: ActionConfigs,
  retry_limit: Type.Number({ minimum: 0, maximum: 6 }),
  retry_delay: Type.Number({ minimum: 1, maximum: 60 * 60 }),
  retry_backoff: Type.Boolean(),
  // in seconds
  run_after: Type.Number({ minimum: 0, maximum: 10 }),
  // how long for this job to expire
  expire_in_seconds: Type.Number({ minimum: 5, maximum: 60 }),
});

export const actionContract = createContract({
  create: {
    input: ActionInfo,
    type: 'mutation',
    output: Result,
  },
  edit: {
    input: Type.Object({
      action_id: Uuid,
      info: ActionInfo,
    }),
    type: 'mutation',
    output: Success,
  },
});
