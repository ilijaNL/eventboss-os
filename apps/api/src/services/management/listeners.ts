import { createPublisherFactory, CreateHandlerResult } from '@/utils/event-publisher';
import { requireAllDefaults } from '@/utils/require-all';
import { CompiledQuery } from 'kysely';

export const actionsListeners = requireAllDefaults<CreateHandlerResult<CompiledQuery>>({
  dirname: __dirname,
  recursive: true,
  // ensure we dont get name collisions
  map: (_, path) => path,
  filter: (file: string) => {
    if (file.includes('.handler.')) {
      return file;
    }

    return null;
  },
});

export const createPublisher = createPublisherFactory(actionsListeners);
