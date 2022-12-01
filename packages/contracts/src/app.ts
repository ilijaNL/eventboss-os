import { Success } from './common';
import { Type } from '@sinclair/typebox';
import { createContract } from '@typed-doc/core';

export const appContract = createContract({
  add_env: {
    type: 'mutation',
    input: Type.Object({
      key: Type.String({ minLength: 3 }),
      value: Type.String({ minLength: 1 }),
    }),
    output: Success,
  },
});
