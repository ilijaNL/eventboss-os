import { appContract } from 'api-contracts';
import { createEventsFactory } from '@/utils/ddd';
import { Type } from '@sinclair/typebox';

export const appEvents = createEventsFactory({
  app_added: Type.Object({
    id: Type.String({ format: 'uuid' }),
    name: Type.String({ minLength: 3 }),
  }),
  app_env_changed: Type.Object({
    key: appContract.add_env.input.properties.key,
    preview: Type.String(),
    encryptedValue: Type.String(),
  }),
});
