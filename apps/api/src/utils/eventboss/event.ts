import db from '@/db';
import { execute as execQueries } from '@/db';
import { v4 } from 'uuid';
import { CompiledQuery, InsertObject, sql } from 'kysely';
import fastJson from 'fast-json-stable-stringify';
import { createStaleWhileRevalidateCache } from '@/utils/swr';
import { DB } from '@/__generated__/db';
import { TASK_STATE } from './tasks';

const swr = createStaleWhileRevalidateCache({
  // in milliseconds
  minTimeToStale: 1000 * 2,
  maxTimeToLive: 1000 * 5,
});

export async function emitEvent(props: { event_slug: string; payload: any; app_id: string }) {
  // get data about the event and linked activities
  const data = await swr([props.app_id, props.event_slug].join('::'), async () => {
    const event = await db
      .selectFrom('eventboss.events')
      .select(['id', 'name', 'slug'])
      .where('slug', '=', props.event_slug)
      .where('app_id', '=', props.app_id)
      .executeTakeFirstOrThrow();

    // get activites
    const activities = await db
      .selectFrom('eventboss.event_activities as ea')
      .innerJoin('eventboss.activities as activities', 'activities.id', 'ea.activity_id')
      .where('ea.event_id', '=', event.id)
      .select([
        'activities.id',
        'activities.name',
        'type_configuration as config',
        'type',
        'retry_backoff',
        'retry_delay',
        'expire_in',
        'delay_seconds',
        'retry_limit',
      ])
      .execute();

    return {
      event,
      activities,
    };
  });

  const exec_id = v4();

  const jsonPayload = fastJson(props.payload);

  const queries: CompiledQuery[] = [
    db
      .insertInto('eventboss.event_executions')
      .values({
        exec_id: exec_id,
        event_id: data.event.id,
        payload: jsonPayload,
        app_id: props.app_id,
        created_at: sql`now()`,
      })
      .compile(),
  ];

  const tasks = data.activities.map<InsertObject<DB, 'eventboss.task_queue'>>((activity) => {
    const task_id = v4();

    return {
      id: task_id,
      app_id: props.app_id,
      data: fastJson(props.payload),
      activity_id: activity.id,
      event_id: data.event.id,
      exec_id: exec_id,
      type: activity.type,
      // in seconds
      expire_in: sql`CAST('${activity.expire_in}' as interval)`,
      retry_backoff: activity.retry_backoff,
      retry_delay: activity.retry_delay,
      retry_limit: activity.retry_limit,
      retry_count: 0,
      state: TASK_STATE.scheduled,
      // in seconds
      scheduled_at: sql`now() + CAST('${activity.delay_seconds ?? 0}' as interval)`,
    };
  });

  // create tasks
  if (tasks.length) {
    const query = db.insertInto('eventboss.task_queue').values(tasks).returningAll();
    queries.push(query.compile());
  }

  await execQueries(queries);
}
