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
  slug: Type.String({ minLength: 3 }),
  name: Type.String({ minLength: 2 }),
  config: ActionConfigs,
  retry_limit: Type.Number({ maximum: 6 }),
  retry_delay: Type.Number({ maximum: 60 * 60 }),
  retry_backoff: Type.Boolean(),
  // in seconds
  run_after: Type.Number({ maximum: 10 }),
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
