import { ActionConfigs } from 'api-contracts';
import db from '@/db';
import { execute } from '@/utils/graphql/graphql-client';
import { execute as execQueries } from '@/db';
import { GetEventActionsDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { Static } from '@sinclair/typebox';
import { match } from 'ts-pattern';
import { v4 } from 'uuid';
import { CompiledQuery, InsertObject, sql } from 'kysely';
import fastJson from 'fast-json-stable-stringify';
import { AppContext } from '@/utils/context';
import { createStaleWhileRevalidateCache } from '@/utils/swr';
import { createJobData } from './event-processor';
import { DB } from '@/__generated__/db';
import { JobData, JOB_TRANSITION_STATE } from './jobs';

const swr = createStaleWhileRevalidateCache({
  minTimeToStale: 1000 * 2,
  maxTimeToLive: 1000 * 5, // in milliseconds
});

/**
 * Possible optimalisation is to move more work to the database
 * - create action logs + jobs with one query, especially when many actions can be linked
 * @param context
 * @param input
 */
export async function dispatchEvent(context: AppContext, input: { event_slug: string; payload: any }) {
  const event = await swr(fastJson({ ...context.graphqlContext, slug: input.event_slug }), async () => {
    return execute(context.graphqlContext, GetEventActionsDocument, {
      event_slug: input.event_slug,
    }).then((d) => d.app_events[0]);
  });

  if (!event) {
    throw new createHttpError.NotFound();
  }

  const actions = event.event_actions.map((ea) => ea.action);

  const exec_id = v4();

  const jsonPayload = fastJson(input.payload);
  const queries: CompiledQuery[] = [
    db
      .insertInto('app.event_executions')
      .values({
        exec_id: exec_id,
        event_id: event.id,
        payload: jsonPayload,
        app_id: context.app_id,
        created_at: sql`now()`,
      })
      .compile(),
  ];

  const items = actions.map((action) => {
    const jobPayload = match({ config: action.config, type: action.type } as Static<typeof ActionConfigs>)
      .with({ type: 'test' }, (config) => createJobData({ type: config.type, a_id: context.app_id }))
      .with({ type: 'webhook' }, (config) =>
        createJobData({
          type: config.type,
          ed: input.payload,
          h: config.config.headers,
          a_id: context.app_id,
          m: 'POST',
          u: config.config.endpoint,
        })
      )
      .exhaustive();
    const job_id = v4();

    const job: InsertObject<DB, 'app.jobs'> = {
      id: job_id,
      app_id: context.app_id,
      data: fastJson({
        meta: {
          action_id: action.id,
          event_id: event.id,
          exec_id: exec_id,
        },
        job: jobPayload,
      } as JobData<any>),
      // in seconds
      expire_in: sql`CAST('${action.expire_in}' as interval)`,
      retry_backoff: action.retry_backoff,
      retry_delay: action.retry_delay,
      retry_limit: action.retry_limit,
      retry_count: 0,
      state: 0,
      // in seconds
      scheduled_at: sql`now() + CAST('${action.run_after ?? 0}' as interval)`,
    };

    const result: { job: InsertObject<DB, 'app.jobs'> } = {
      job: job,
    };

    return result;
  });

  // create job per action
  if (items.length) {
    const query = db
      .with('jobs', (db) =>
        db
          .insertInto('app.jobs')
          .values(items.map((i) => i.job))
          .returningAll()
      )
      .insertInto('app.job_events')
      .columns(['exec_id', 'app_id', 'job_id', 'action_id', 'event_id', 'data', 'created_at', 'event_name'])
      .expression((eb) =>
        eb
          .selectFrom('jobs')
          .select([
            sql`("jobs"."data"->'meta'->>'exec_id')::uuid`.as('exec_id'),
            'jobs.app_id',
            'jobs.id',
            sql`("jobs"."data"->'meta'->>'action_id')::uuid`.as('aid'),
            sql`("jobs"."data"->'meta'->>'event_id')::uuid`.as('eid'),
            sql`json_build_object('job_state', row_to_json(jobs))`.as('data'),
            sql`now()`.as('now'),
            sql`${JOB_TRANSITION_STATE.scheduled}`.as('e_name'),
          ])
      );
    queries.push(query.compile());
    // queries.push(db.with((db) => db))
  }

  console.time('executing insert');
  await execQueries(queries);
  console.timeEnd('executing insert');
}
