import { Type } from '@sinclair/typebox';
import { createContract } from '@typed-doc/core';
import { Result, Success } from './common';
import { Uuid } from './schema';

export const EventData = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 256 }),
  slug: Type.String({ minLength: 3, maxLength: 128 }),
});

export const eventsContract = createContract({
  create: {
    type: 'mutation',
    input: EventData,
    output: Result,
  },
  edit: {
    type: 'mutation',
    input: Type.Object({
      event_id: Type.String({ format: 'uuid' }),
      info: EventData,
    }),
    output: Success,
  },
  assign_action: {
    type: 'mutation',
    input: Type.Object({
      event_id: Uuid,
      action_id: Uuid,
    }),
    output: Success,
  },
  // send event
  send: {
    type: 'mutation',
    input: Type.Object({
      event_slug: Type.String(),
      payload: Type.Any(),
    }),
    output: Success,
  },
});
