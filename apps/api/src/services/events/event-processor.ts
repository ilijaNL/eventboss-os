import { fetch } from 'undici';
import fastJson from 'fast-json-stable-stringify';
import db from '@/db';
import { createStaleWhileRevalidateCache } from '@/utils/swr';
import { decrypt } from '@/utils/encryption';
import { FastifyInstance } from 'fastify';

interface IEvent {
  /**
   * App id
   */
  a_id: string;
}

interface IWebhookEvent extends IEvent {
  type: 'webhook';
  /**
   * Http Method
   */
  m: 'POST' | 'GET';
  /**
   * Headers
   */
  h: Record<string, string>;
  /**
   * Endpoint
   */
  u: string;
  /**
   * Event payload
   */
  ed: any;
}

interface ITestEvent extends IEvent {
  type: 'test';
}

export type TJobEventPayload = IWebhookEvent | ITestEvent;

export function createJobData(event: TJobEventPayload) {
  return event;
}

type EventHandlers<T extends TJobEventPayload, Context = unknown> = {
  [P in T['type']]: (event: T extends { type: P } ? T : never, context: Context) => Promise<any>;
};

function getAppEnvs(app_id: string) {
  return db.selectFrom('app.environments').select(['id', 'value', 'key']).where('app_id', '=', app_id).execute();
}

const envSWR = createStaleWhileRevalidateCache({
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

/**
 * Map for event handlers
 */
export const eventHandlers: EventHandlers<TJobEventPayload, FastifyInstance> = {
  webhook: async (event, _) => {
    const appEnvs = await envSWR(`env_${event.a_id}`, () => getAppEnvs(event.a_id));
    const headers = { ...event.h };

    const envs = appEnvs.reduce((agg, item) => {
      agg[item.key] = item.value;
      return agg;
    }, {} as Record<string, string>);

    // interpolate headers
    Object.keys(headers).forEach((headerKey) => {
      headers[headerKey] = interpolateValue(DELIMITER, event.h[headerKey]!, envs);
    });
    // interpolate url
    const url = interpolateValue(DELIMITER, event.u, envs);

    return fetch(url, { headers: headers, body: fastJson(event.ed), method: event.m }).then((r) => {
      if (r.ok) {
        return r.json();
      }

      return r.json().then((d) => Promise.reject(d));
    });
  },
  test: async () => {
    return Promise.resolve({ success: true });
  },
};
