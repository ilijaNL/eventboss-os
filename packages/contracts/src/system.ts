import { Result } from './common';
import { Type } from '@sinclair/typebox';
import { createContract } from '@typed-doc/core';

export const systemContract = createContract({
  create_app: {
    type: 'mutation',
    input: Type.Object({
      name: Type.String({ minLength: 3 }),
    }),
    output: Result,
  },
});
