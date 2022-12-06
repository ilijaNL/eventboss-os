import db from '@/db';
import { QueryExecutorProvider, sql } from 'kysely';
import fastJson from 'fast-json-stable-stringify';

const JOB_STATES = {
  scheduled: 0,
  retry: 1,
  running: 2,
  completed: 3,
  failed: 4,
} as const;

export const JOB_TRANSITION_STATE = {
  scheduled: 'scheduled',
  started: 'started',
  retried: 'retried',
  completed: 'completed',
  failed: 'failed',
} as const;

type JOB_STATE_TYPE = typeof JOB_TRANSITION_STATE[keyof typeof JOB_TRANSITION_STATE];

export type JobData<T> = {
  meta: {
    action_id: string;
    event_id: string;
    exec_id: string;
  };
  job: T;
};

export type Job<T = unknown, R = unknown> = {
  id: string;
  data: JobData<T>;
  retry_limit: number;
  retry_count: number;
  expire_in_seconds: number;
  done: (err?: Error | null, data?: R) => void;
};

type InternalJob = Pick<Job<any>, 'id' | 'retry_limit' | 'retry_count'>;

const scheduleAfterCase = sql`CASE
  WHEN retry_count = retry_limit THEN scheduled_at
  WHEN NOT retry_backoff THEN now() + retry_delay * interval '1'
  ELSE now() +
    (
        retry_delay * 2 ^ LEAST(16, retry_count + 1) / 2
        +
        retry_delay * 2 ^ LEAST(16, retry_count + 1) / 2 * random()
    )
    * interval '1'
  END
`;

const EXPIRED_PAYLOAD = fastJson({ status: 'expired' });

function mapCompletionDataArg(data: any) {
  if (data === null || typeof data === 'undefined' || typeof data === 'function') {
    return fastJson({});
  }

  const result = typeof data === 'object' && !Array.isArray(data) ? data : { value: data };
  return fastJson(result);
}

async function removeAndLogJob(job: InternalJob, payload: any, event_type: JOB_STATE_TYPE) {
  await db
    .with('dj', (db) => db.deleteFrom('app.jobs').where('id', '=', job.id).returningAll())
    .insertInto('app.job_events')
    .columns(['exec_id', 'app_id', 'job_id', 'action_id', 'event_id', 'data', 'created_at', 'event_name'])
    .expression((eb) =>
      eb
        .selectFrom('dj')
        .select([
          sql`("dj"."data"->'meta'->>'exec_id')::uuid`.as('exec_id'),
          'dj.app_id',
          'dj.id',
          sql`("dj"."data"->'meta'->>'action_id')::uuid`.as('aid'),
          sql`("dj"."data"->'meta'->>'event_id')::uuid`.as('eid'),
          sql`json_build_object('result', ${mapCompletionDataArg(payload)}::jsonb, 'job_state', row_to_json(dj))`.as(
            'data'
          ),
          sql`now()`.as('now'),
          sql`${event_type}`.as('state'),
        ])
    )
    .execute();
}

async function completeJob(job: InternalJob, result: any) {
  await removeAndLogJob(job, result, 'completed');
}

// retry if allowed, otherwise set state to failed
async function failJob(job: InternalJob, error: any) {
  if (job.retry_count >= job.retry_limit) {
    // insert job data into log
    return await removeAndLogJob(job, error, 'failed');
  }

  const query = db
    .updateTable('app.jobs')
    .set({
      state: JOB_STATES.retry,
      scheduled_at: scheduleAfterCase,
      result: mapCompletionDataArg(error),
    })
    .where('id', '=', job.id);

  await query.execute();
}

function done<T>(this: InternalJob, error: any, result: T) {
  const self = this;
  if (error) {
    return failJob(self, error).catch(() => {});
  }

  return completeJob(self, result).catch(() => {});
}

export async function getScheduledJobs<T>(props: { amount: number }) {
  const dbJobsQuery = db
    .with('sj', (db) =>
      db
        .selectFrom('app.jobs')
        .where('scheduled_at', '<', sql`now()`)
        .where('state', '<', JOB_STATES.running)
        .selectAll()
        .orderBy('scheduled_at', 'desc')
        .limit(props.amount)
        .forUpdate()
        .skipLocked()
    )
    .with('job_logs', (db) =>
      db
        .insertInto('app.job_events')
        .columns(['exec_id', 'app_id', 'job_id', 'action_id', 'event_id', 'data', 'created_at', 'event_name'])
        .expression((eb) =>
          eb
            .selectFrom('sj')
            .select([
              sql`("sj"."data"->'meta'->>'exec_id')::uuid`.as('exec_id'),
              'sj.app_id',
              'sj.id',
              sql`("sj"."data"->'meta'->>'action_id')::uuid`.as('aid'),
              sql`("sj"."data"->'meta'->>'event_id')::uuid`.as('eid'),
              sql`json_build_object('job_state', row_to_json(sj))`.as('data'),
              sql`now()`.as('now'),
              sql`CASE WHEN sj.state = ${JOB_STATES.retry}::integer THEN ${JOB_TRANSITION_STATE.retried} ELSE ${JOB_TRANSITION_STATE.started} END`.as(
                'e_name'
              ),
            ])
        )
    )
    .updateTable('app.jobs as j')
    .from('sj')
    .set({
      state: JOB_STATES.running,
      started_at: sql`now()`,
      retry_count: sql`CASE WHEN j.state = ${JOB_STATES.retry} THEN j.retry_count + 1 ELSE j.retry_count END`,
    })
    .whereRef('j.id', '=', 'sj.id')
    .returning([
      'j.id',
      'j.retry_count',
      'j.retry_limit',
      'j.data',
      sql`EXTRACT(epoch FROM j.expire_in)`.as('expire_in_seconds'),
    ]);

  const dbJobs = await dbJobsQuery.execute();

  return dbJobs.map<Job<T>>((dj) => {
    return {
      id: dj.id,
      data: dj.data as unknown as JobData<T>,
      done: done.bind(dj),
      retry_count: dj.retry_count,
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
 * Periodically check jobs if they are expired and can be retried
 * this is a singleton job
 */
export async function expireJobsAndRetry() {
  await db.transaction().execute(async (db) => {
    const hasLock = await tryToAcquireLock(expireAndRetryHashKey, db);

    if (!hasLock) {
      return;
    }

    const query = db
      .updateTable('app.jobs')
      .set({
        state: JOB_STATES.retry,
        scheduled_at: scheduleAfterCase,
        result: EXPIRED_PAYLOAD,
      })
      .where('state', '=', JOB_STATES.running)
      .whereRef('started_at', '<', sql`now() - expire_in`)
      .whereRef('retry_count', '<', 'retry_limit');

    await query.execute();
  });
}

/**
 * Periodically check jobs if they are expired and can be retried
 * this is a singleton job, which means should run once every interval across all instances
 */
export async function expireJobsAndFail() {
  const event_type = JOB_TRANSITION_STATE.failed;

  await db.transaction().execute(async (db) => {
    const hasLock = await tryToAcquireLock(expireAndFailKey, db);

    if (!hasLock) {
      return;
    }

    const query = db
      .with('dj', (db) =>
        db
          .deleteFrom('app.jobs')
          .where('state', '=', JOB_STATES.running)
          .whereRef('started_at', '<', sql`now() - expire_in`)
          .whereRef('retry_count', '>=', 'retry_limit')
          .returningAll()
      )
      .insertInto('app.job_events')
      .columns(['exec_id', 'app_id', 'job_id', 'action_id', 'event_id', 'data', 'created_at', 'event_name'])
      .expression((eb) =>
        eb
          .selectFrom('dj')
          .select([
            sql`("dj"."data"->'meta'->>'exec_id')::uuid`.as('exec_id'),
            'dj.app_id',
            'dj.id',
            sql`("dj"."data"->'meta'->>'action_id')::uuid`.as('aid'),
            sql`("dj"."data"->'meta'->>'event_id')::uuid`.as('eid'),
            sql`json_build_object('result', ${EXPIRED_PAYLOAD}::jsonb, 'job_state', row_to_json(dj))`.as('data'),
            sql`now()`.as('now'),
            sql`${event_type}`.as('state'),
          ])
      );

    await query.execute();
  });
}
