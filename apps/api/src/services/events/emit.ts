import { ActionConfigs } from 'api-contracts';
import db from '@/db';
import { execute } from '@/utils/graphql/graphql-client';
import { execute as execQueries } from '@/db';
import { GetEventActionsDocument } from '@/__generated__/app-documents';
import createHttpError from 'http-errors';
import { Static } from '@sinclair/typebox';
import { match } from 'ts-pattern';
import { createJobs, JobPayload } from '@/utils/pg-boss';
import { v4 } from 'uuid';
import { CompiledQuery, sql } from 'kysely';
import fastJson from 'fast-json-stable-stringify';
import { AppContext } from '@/utils/context';
import { createStaleWhileRevalidateCache } from '@/utils/swr';
import { createJobData } from './event-processor';

const swr = createStaleWhileRevalidateCache({
  minTimeToStale: 1000 * 2,
  maxTimeToLive: 1000 * 5, // in milliseconds
});

/**
 *
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

  const jobPayloads: Array<JobPayload & { action_id: string }> = actions.reduce((agg, action) => {
    const job = {
      action_id: action.id,
      name: `eb.${context.app_id}`,
      data: fastJson(
        match({ config: action.config, type: action.type } as Static<typeof ActionConfigs>)
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
          .exhaustive()
      ),
      id: v4(),
      retrybackoff: action.retry_backoff,
      retrydelay: action.retry_delay,
      retrylimit: action.retry_limit,
      startafter: sql`now() + CAST('${action.run_after ?? 0}' as interval)`,
      // calculate the maximum time based on backof, delay and limit + run after
      keepuntil: sql`now() + CAST('${(action.run_after ?? 0) + 3600}' as interval)`,
      // TODO do something with singletonkey
    } as JobPayload & { action_id: string };

    agg.push(job);

    return agg;
  }, [] as Array<JobPayload & { action_id: string }>);

  const jsonPayload = fastJson(input.payload);

  // create event log
  const event_log_id = v4();
  const queries: CompiledQuery[] = [
    db
      .insertInto('app.event_logs')
      .values({
        id: event_log_id,
        event_id: event.id,
        payload: jsonPayload,
        trace: null,
        app_id: context.app_id,
        created_at: sql`now()`,
      })
      .compile(),
  ];

  // create job per action
  if (jobPayloads.length) {
    const jobs = createJobs(jobPayloads.map(({ action_id, ...payload }) => payload));
    queries.push(jobs);

    const actionEvent = db
      .insertInto('app.action_logs')
      .values(
        jobPayloads.map((p) => ({
          id: v4(),
          action_id: p.action_id,
          event_log_id: event_log_id,
          event_id: event.id,
          job_id: p.id as string,
          payload: jsonPayload,
          app_id: context.app_id,
          trace: null,
          created_at: sql`now()`,
        }))
      )
      .compile();
    queries.push(actionEvent);
  }

  await execQueries(queries);
}
