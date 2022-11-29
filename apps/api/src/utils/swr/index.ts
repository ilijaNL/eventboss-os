import { Config } from './types';
import { isFunction, isNil, parseConfig } from './helpers';

interface StaleWhileRevalidate {
  <ReturnValue>(cacheKey: string | (() => string), fn: () => ReturnValue): Promise<ReturnValue>;
}

export function createStaleWhileRevalidateCache(config: Config): StaleWhileRevalidate {
  const { storage, minTimeToStale, maxTimeToLive, serialize, deserialize } = parseConfig(config);

  return async function staleWhileRevalidate<ReturnValue>(
    cacheKey: string | (() => string),
    fn: () => ReturnValue
  ): Promise<ReturnValue> {
    const key = isFunction(cacheKey) ? String(cacheKey()) : String(cacheKey);
    const timeKey = `${key}_time`;

    async function retrieveCachedValue() {
      try {
        // eslint-disable-next-line prefer-const
        let [cachedValue, cachedTime] = await Promise.all([storage.getItem(key), storage.getItem(timeKey)]);

        cachedValue = deserialize(cachedValue);

        if (isNil(cachedValue)) {
          return { cachedValue: null, cachedAge: 0 };
        }

        const now = Date.now();
        const cachedAge = now - Number(cachedTime);

        if (cachedAge > maxTimeToLive) {
          cachedValue = null;
        }

        return { cachedValue, cachedAge };
      } catch (error) {
        return { cachedValue: null, cachedAge: 0 };
      }
    }

    async function persistValue(result: ReturnValue) {
      try {
        await Promise.all([storage.setItem(key, serialize(result)), storage.setItem(timeKey, Date.now().toString())]);
      } catch (error) {}
    }

    async function revalidate() {
      try {
        const result = await fn();

        // Intentionally persisting asynchronously and not blocking since there is
        // in any case a chance for a race condition to occur when using an external
        // persistence store, like Redis, with multiple consumers. The impact is low.
        persistValue(result);

        return result;
      } catch (error) {
        throw error;
      }
    }

    const { cachedValue, cachedAge } = await retrieveCachedValue();

    if (!isNil(cachedValue)) {
      if (cachedAge >= minTimeToStale) {
        // Non-blocking so that revalidation runs while stale cache data is returned
        // Error handled in `revalidate` by emitting an event, so only need a no-op here
        revalidate().catch(() => {});
      }

      return cachedValue as ReturnValue;
    }

    return revalidate();
  };
}
