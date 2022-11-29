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

function interpolateValue(selector: string, value: string, map: Array<{ key: string; value: string }>): string {
  if (value.startsWith(selector)) {
    const valueKey = value.split(selector)[1];
    const foundValue = map.find((m) => m.key === valueKey)?.value;
    if (!foundValue) {
      return value;
    }
    return decrypt(foundValue);
  }
  return value;
}

const ENV_SELECTOR = 'ENV::';

/**
 * Map for event handlers
 */
export const eventHandlers: EventHandlers<TJobEventPayload, FastifyInstance> = {
  webhook: async (event, _) => {
    const appEnvs = await envSWR(`env_${event.a_id}`, () => getAppEnvs(event.a_id));
    const headers = { ...event.h };
    // interpolate headers
    Object.keys(headers).forEach((headerKey) => {
      headers[headerKey] = interpolateValue(ENV_SELECTOR, event.h[headerKey]!, appEnvs);
    });
    // interpolate url
    const url = interpolateValue(ENV_SELECTOR, event.u, appEnvs);

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
