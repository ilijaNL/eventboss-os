import db from '@/db';
import { InsertObject, QueryExecutorProvider, SelectQueryBuilder, sql } from 'kysely';
import fastJson from 'fast-json-stable-stringify';
import { DB } from '@/__generated__/db';
import { ActivityConfigType } from 'api-contracts';

export const TASK_STATE = {
  scheduled: 0,
  retry: 1,
  running: 2,
} as const;

export const TASK_TRANSITION_STATE = {
  scheduled: 'scheduled',
  started: 'started',
  completed: 'completed',
  failed_and_rescheduled: 'failed_and_rescheduled',
  expired_and_rescheduled: 'expired_and_rescheduled',
  expired_and_failed: 'expired_and_failed',
  failed: 'failed',
} as const;

type TASK_STATE_TYPE = typeof TASK_TRANSITION_STATE[keyof typeof TASK_TRANSITION_STATE];

export type Task<TData = unknown> = {
  id: string;
  data: TData;
  app_id: string;
  activity_id: string;
  retry_limit: number;
  retry_count: number;
  expire_in_seconds: number;
};

const scheduleAfterCase = sql`CASE
  WHEN retry_count = retry_limit THEN scheduled_at
  WHEN NOT retry_backoff THEN now() + retry_delay * interval '1'
  ELSE now() +
    (
      retry_delay * 2 ^ LEAST(16, retry_count + 1) / 2
      +
      retry_delay * 2 ^ LEAST(16, retry_count + 1) / 2 * random()
    ) * interval '1'
  END
`;

function replaceErrors(value: any) {
  if (value instanceof Error) {
    var error = {} as any;

    Object.getOwnPropertyNames(value).forEach(function (propName) {
      error[propName] = (value as any)[propName];
    });

    return error;
  }

  return value;
}

function mapCompletionDataArg(data: any) {
  if (data === null || typeof data === 'undefined' || typeof data === 'function') {
    return fastJson({});
  }

  const result = typeof data === 'object' && !Array.isArray(data) ? data : { value: data };
  const json = fastJson(replaceErrors(result));

  return json;
}

async function removeAndLog(app_id: string, task_id: string, payload: any, event_type: TASK_STATE_TYPE) {
  await db
    .with('tasks', (db) =>
      db.deleteFrom('eventboss.task_queue').where('app_id', '=', app_id).where('id', '=', task_id).returningAll()
    )
    .insertInto('eventboss.task_logs')
    .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
    .expression((eb) =>
      eb
        .selectFrom('tasks')
        .select([
          'tasks.activity_id',
          'tasks.app_id',
          sql`json_build_object('result', ${mapCompletionDataArg(payload)}::jsonb, 'task', row_to_json(tasks))`.as(
            'data'
          ),
          'tasks.event_id',
          sql`${event_type}`.as('event_name'),
          'tasks.exec_id',
          'tasks.id',
          sql`now()`.as('created_at'),
        ])
    )
    .execute();
}

export async function completeTask(app_id: string, task_id: string, result: any) {
  return removeAndLog(app_id, task_id, result, TASK_TRANSITION_STATE.completed);
}

/**
 * Fails a task, however determine if should be rescheduled or fail completely
 * @param task_id
 * @param error
 * @returns
 */
export async function failTask(app_id: string, task_id: string, error: any) {
  await db
    .with('task', (db) =>
      db
        .selectFrom('eventboss.task_queue')
        .selectAll()
        .where('app_id', '=', app_id)
        .where('id', '=', task_id)
        .where('state', '=', TASK_STATE.running)
        .forUpdate()
    )
    .with('dt', (db) =>
      db
        .deleteFrom('eventboss.task_queue')
        .where('app_id', '=', app_id)
        .where('id', '=', task_id)
        .where('state', '=', TASK_STATE.running)
        .whereRef('retry_count', '>=', 'retry_limit')
    )
    .with('rt', (db) =>
      db
        .updateTable('eventboss.task_queue')
        .set({
          state: TASK_STATE.retry,
          scheduled_at: scheduleAfterCase,
        })
        .where('app_id', '=', app_id)
        .where('id', '=', task_id)
        .where('state', '=', TASK_STATE.running)
        .whereRef('retry_count', '<', 'retry_limit')
    )
    .insertInto('eventboss.task_logs')
    .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
    .expression((eb) =>
      eb
        .selectFrom('task')
        .select([
          'task.activity_id',
          'task.app_id',
          sql`json_build_object('result', ${mapCompletionDataArg(error)}::jsonb, 'task', row_to_json(task))`.as('data'),
          'task.event_id',
          sql`CASE WHEN retry_count >= retry_limit THEN ${TASK_TRANSITION_STATE.failed} ELSE ${TASK_TRANSITION_STATE.failed_and_rescheduled} END`.as(
            'event_name'
          ),
          'task.exec_id',
          'task.id',
          sql`now()`.as('created_at'),
        ])
    )
    .execute();
}

export function getTasksByActivity<T>(props: { activity_id: string; amount: number; app_id: string }) {
  return _getTasks<T>((builder) => builder.where('activity_id', '=', props.activity_id), props.app_id, props.amount);
}

export function getTasksByType<T>(props: { type: ActivityConfigType['type']; amount: number; app_id: string }) {
  return _getTasks<T>((builder) => builder.where('type', '=', props.type), props.app_id, props.amount);
}

async function _getTasks<T>(
  builderFn: (
    builder: SelectQueryBuilder<DB, 'eventboss.task_queue', {}>
  ) => SelectQueryBuilder<DB, 'eventboss.task_queue', {}>,
  app_id: string,
  limit: number
) {
  const dbJobsQuery = db
    .with('tasks', (db) =>
      builderFn(
        db
          .selectFrom('eventboss.task_queue')
          .where('app_id', '=', app_id)
          .where('scheduled_at', '<', sql`now()`)
          .where('state', '<', TASK_STATE.running)
      )
        .selectAll()
        .orderBy('scheduled_at', 'desc')
        .limit(limit)
        .forUpdate()
        .skipLocked()
    )
    // logs
    .with('logs', (db) =>
      db
        .insertInto('eventboss.task_logs')
        .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
        .expression((eb) =>
          eb
            .selectFrom('tasks')
            .select([
              'tasks.activity_id',
              'tasks.app_id',
              sql`json_build_object('task', row_to_json(tasks))`.as('data'),
              'tasks.event_id',
              sql`${TASK_TRANSITION_STATE.started}`.as('e_name'),
              'tasks.exec_id',
              'tasks.id',
              sql`now()`.as('created_at'),
            ])
        )
    )
    .updateTable('eventboss.task_queue as tq')
    .from('tasks')
    .set({
      state: TASK_STATE.running,
      started_at: sql`now()`,
      retry_count: sql`CASE WHEN tq.state = ${TASK_STATE.retry} THEN tq.retry_count + 1 ELSE tq.retry_count END`,
    })
    .whereRef('tq.id', '=', 'tasks.id')
    .returning([
      'tq.id',
      'tq.app_id',
      'tq.retry_count',
      'tq.retry_limit',
      'tq.data',
      'tq.activity_id',
      sql`EXTRACT(epoch FROM tq.expire_in)`.as('expire_in_seconds'),
    ]);

  const dbJobs = await dbJobsQuery.execute();

  return dbJobs.map<Task<T>>((dj) => {
    return {
      id: dj.id,
      app_id: dj.app_id,
      data: dj.data as unknown as T,
      retry_count: dj.retry_count,
      activity_id: dj.activity_id,
      retry_limit: dj.retry_limit,
      expire_in_seconds: dj.expire_in_seconds as number,
    };
  });
}

function hashStringToInt(str: string): number {
  let hash = 5381;
  let i = -1;
  while (i < str.length - 1) {
    i += 1;
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

const expireAndRetryHashKey = hashStringToInt('expire_retry');
const expireAndFailKey = hashStringToInt('expire_fail');

async function tryToAcquireLock(id: number, db: QueryExecutorProvider) {
  return await sql<{ has_lock: boolean }>`select pg_try_advisory_lock(${id}) as has_lock`
    .execute(db)
    .then((d) => d.rows[0]?.has_lock ?? false);
}

/**
 * Periodically check jobs if they are expired and can be retried.
 * This is a singleton job
 */
export async function expireJobsAndRetry() {
  return await db.transaction().execute(async (db) => {
    const hasLock = await tryToAcquireLock(expireAndRetryHashKey, db);

    if (!hasLock) {
      return [];
    }

    const query = db
      .with('tasks', (db) =>
        db
          .updateTable('eventboss.task_queue')
          .set({
            state: TASK_STATE.retry,
            scheduled_at: scheduleAfterCase,
          })
          .where('state', '=', TASK_STATE.running)
          .whereRef('started_at', '<', sql`now() - expire_in`)
          .whereRef('retry_count', '<', 'retry_limit')
          .returningAll()
      )
      .insertInto('eventboss.task_logs')
      .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
      .expression((eb) =>
        eb
          .selectFrom('tasks')
          .select([
            'tasks.activity_id',
            'tasks.app_id',
            sql`json_build_object('task', row_to_json(tasks))`.as('data'),
            'tasks.event_id',
            sql`${TASK_TRANSITION_STATE.expired_and_rescheduled}`.as('e_name'),
            'tasks.exec_id',
            'tasks.id',
            sql`now()`.as('created_at'),
          ])
      );

    return await query.execute();
  });
}

export function createTasks(tasks: Array<InsertObject<DB, 'eventboss.task_queue'>>) {
  return db
    .with('tasks', (db) => db.insertInto('eventboss.task_queue').values(tasks).returningAll())
    .insertInto('eventboss.task_logs')
    .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
    .expression((eb) =>
      eb
        .selectFrom('tasks')
        .select([
          'tasks.activity_id',
          'tasks.app_id',
          sql`json_build_object('task', row_to_json(tasks))`.as('data'),
          'tasks.event_id',
          sql`${TASK_TRANSITION_STATE.scheduled}`.as('e_name'),
          'tasks.exec_id',
          'tasks.id',
          sql`now()`.as('created_at'),
        ])
    );
}

/**
 * Periodically check jobs if they are expired and cannot be retried
 * This is a singleton job, which means should run once every interval across all instances
 */
export async function expireJobsAndFail() {
  return await db.transaction().execute(async (db) => {
    const hasLock = await tryToAcquireLock(expireAndFailKey, db);

    if (!hasLock) {
      return;
    }

    await db
      .with('tasks', (db) =>
        db
          .deleteFrom('eventboss.task_queue')
          .where('state', '=', TASK_STATE.running)
          .whereRef('started_at', '<', sql`now() - expire_in`)
          .whereRef('retry_count', '>=', 'retry_limit')
          .returningAll()
      )
      .insertInto('eventboss.task_logs')
      .columns(['activity_id', 'app_id', 'data', 'event_id', 'event_name', 'exec_id', 'task_id', 'created_at'])
      .expression((eb) =>
        eb
          .selectFrom('tasks')
          .select([
            'tasks.activity_id',
            'tasks.app_id',
            sql`json_build_object('task', row_to_json(tasks))`.as('data'),
            'tasks.event_id',
            sql`${TASK_TRANSITION_STATE.expired_and_failed}`.as('e_name'),
            'tasks.exec_id',
            'tasks.id',
            sql`now()`.as('created_at'),
          ])
      )
      .execute();
  });
}
