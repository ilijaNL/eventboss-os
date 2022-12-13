import { fetch } from 'undici';
import fastJson from 'fast-json-stable-stringify';
import db from '@/db';
import { createStaleWhileRevalidateCache } from '@/utils/swr';
import { decrypt } from '@/utils/encryption';
import { createWorker } from './worker';
import { getTasksByType, completeTask, failTask, Task } from './tasks';
import { resolveWithinSeconds } from './utils';
import { ActivityConfigType } from 'api-contracts';

function getAppEnvs(app_id: string) {
  return db.selectFrom('eventboss.environments').select(['id', 'value', 'key']).where('app_id', '=', app_id).execute();
}

const webhookSWR = createStaleWhileRevalidateCache({
  minTimeToStale: 1000 * 5, // will fetch max ms intervals
  maxTimeToLive: 1000 * 30, // will fetch new
});

function interpolateValue(delimiters: [string, string], value: string, vars: Record<string, string>): string {
  const template = value.split(new RegExp(`(?:${delimiters[0]}|${delimiters[1]})`));
  let result = '';
  for (let i = 0; i < template.length; i++) {
    let s = template[i]!;

    if (i % 2 === 1) {
      // if odd then is placeholder
      if (s in vars) {
        result += decrypt(vars[s]!);
      } else {
        // if a variable isnt given in vars
        // concatenate the variable name with delimiters instead
        result += delimiters[0] + s + delimiters[1];
      }
    } else {
      // else is just regular text
      result += s;
    }
  }
  return result;
}

const DELIMITER: [string, string] = ['{{', '}}'];

async function webhookHandler(app_id: string, { activity_id, data, retry_count }: Task<any>) {
  // get activity properties
  const activity = await webhookSWR(['activity', activity_id].join('_'), () => {
    return db
      .selectFrom('eventboss.activities')
      .select(['id', 'type_configuration as config', 'app_id', 'type'])
      .where('id', '=', activity_id)
      .where('app_id', '=', app_id)
      .executeTakeFirstOrThrow();
  });

  // get envs
  const appEnvs = await webhookSWR(['env', activity.app_id].join('_'), () => getAppEnvs(activity.app_id));

  const { config } = activity as unknown as ActivityConfigType & { type: 'webhook' };
  const headers = { ...config.headers };

  const envs = appEnvs.reduce((agg, item) => {
    agg[item.key] = item.value;
    return agg;
  }, {} as Record<string, string>);

  // interpolate headers
  Object.keys(headers).forEach((headerKey) => {
    headers[headerKey] = interpolateValue(DELIMITER, headers[headerKey]!, envs);
  });
  // interpolate url
  const url = interpolateValue(DELIMITER, config.endpoint, envs);

  return fetch(url, { headers: headers, body: fastJson({ data: data, retry_count }), method: 'POST' }).then((r) => {
    if (r.ok) {
      return r.json();
    }

    return r.json().then((d) => Promise.reject(d));
  });
}

export function createWebhookWorker(props: { fetchSize: number; maxConcurrency: number; poolInterval: number }) {
  return async function register(app_id: string) {
    const worker = createWorker<Task<any>>({
      fetch: ({ amount }) => getTasksByType({ amount: amount, type: 'webhook', app_id: app_id }),
      fetchSize: props.fetchSize,
      maxConcurrency: props.maxConcurrency,
      poolInternvalInMs: props.poolInterval,
      resolveJob: (task, err, result) => {
        if (err) {
          return failTask(task.app_id, task.id, err);
        }

        return completeTask(task.app_id, task.id, result);
      },
      handler: async (task) => {
        return resolveWithinSeconds(webhookHandler(app_id, task), task.expire_in_seconds);
      },
    });

    return worker;
  };
}
