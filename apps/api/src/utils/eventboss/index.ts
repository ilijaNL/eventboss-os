import { RegisterFn } from './activity';
import { expireJobsAndFail, expireJobsAndRetry } from './tasks';
import { createWebhookWorker } from './webhook';
import { createBaseWorker, Worker } from './worker';

const maintainceWorker = createBaseWorker(
  async () => {
    await expireJobsAndRetry();
    await expireJobsAndFail();
  },
  { loopInterval: 30000 }
);

const createEventBoss = (app_id: string, subscriptions: Array<RegisterFn>) => {
  const workers: Array<Worker> = [];
  // interval in seconds

  async function start() {
    // todo, create a map for subscription workers, so we can notify them
    const subs = await Promise.all(subscriptions.map((fn) => fn(app_id)));

    workers.push(...subs.map((s) => s.worker));

    // create singlewebhook worker
    const webhookWorker = await createWebhookWorker({
      fetchSize: 100,
      maxConcurrency: 500,
      poolInterval: 1500,
    })(app_id);

    // register webhookWorker
    workers.push(webhookWorker);

    // register maintainceWorker
    workers.push(maintainceWorker);

    // start all workers
    workers.forEach((w) => w.start());
  }

  return {
    start,
    /**
     * Stop eventboss gracefully
     */
    stop: async () => {
      await Promise.all(workers.map((w) => w.stop()));
    },
  };
};

export default createEventBoss;
