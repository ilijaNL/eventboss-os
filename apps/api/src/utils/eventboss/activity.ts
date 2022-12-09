import db from '@/db';
import { getTasksByActivity, resolveTask, Task } from './tasks';
import { resolveWithinSeconds } from './utils';
import { createWorker, Worker } from './worker';

export type RegisterFn = (app_id: string) => Promise<{ worker: Worker; activity_id: string }>;

export function createActivitySub<T>(props: {
  slug: string;
  handler: (data: T, task: Task<T>) => Promise<any>;
  poolInterval?: number;
  maxConcurrency?: number;
  fetchSize?: number;
  concurrent?: number;
}): RegisterFn {
  return async function register(app_id: string) {
    // get id of activity, throw if not found
    const activity = await db
      .selectFrom('eventboss.activities')
      .where('slug', '=', props.slug)
      .where('app_id', '=', app_id)
      .select('id')
      .executeTakeFirstOrThrow();

    const worker = createWorker<Task<T>>({
      fetch: ({ amount }) => getTasksByActivity({ amount: amount, activity_id: activity.id, app_id: app_id }),
      fetchSize: props.fetchSize ?? 100,
      maxConcurrency: props.maxConcurrency ?? 100,
      poolInternvalInMs: props.poolInterval ?? 1500,
      resolveJob: resolveTask,
      handler: async (task) => {
        return resolveWithinSeconds(props.handler(task.data, task), task.expire_in_seconds);
      },
    });

    return { worker, activity_id: activity.id };
  };
}
