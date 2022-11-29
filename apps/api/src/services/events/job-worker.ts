import PgBoss, { JobWithDoneCallback } from 'pg-boss';
import delay from 'delay';
import { v4 } from 'uuid';

const resolveWithinSeconds = async (promise: Promise<any>, seconds: number) => {
  const timeout = Math.max(1, seconds) * 1000;
  const reject = delay.reject(timeout, { value: new Error(`handler execution exceeded ${timeout}ms`) });

  let result;

  try {
    result = await Promise.race([promise, reject]);
  } finally {
    try {
      reject.clear();
    } catch {}
  }

  return result;
};

export function createWorker(props: {
  pgBoss: PgBoss;
  fetchSize: number;
  maxConcurrency: number;
  handler: (event: PgBoss.Job<unknown> & { expire_in_seconds: number }) => Promise<any>;
  poolInternvalInMs: number;
}) {
  const { handler, maxConcurrency, poolInternvalInMs, pgBoss, fetchSize } = props;
  let running = false;
  const activeJobs = new Map<string, Promise<any>>();
  let loopPromise: Promise<any>;
  let loopDelayPromise: delay.ClearablePromise<void> | null = null;

  async function run() {
    if (activeJobs.size >= maxConcurrency) {
      return;
    }

    const newJobs = await pgBoss.fetch('eb.*', Math.min(maxConcurrency - activeJobs.size, fetchSize));

    if (!newJobs) {
      return;
    }

    // run jobs
    newJobs.forEach((_job) => {
      const job = _job as JobWithDoneCallback<unknown, any> & { expire_in_seconds: number };

      //  todo do a job raise
      const pId = v4();
      const jobPromise = resolveWithinSeconds(handler(job), job.expire_in_seconds + 5)
        .then((result) => {
          activeJobs.delete(pId);
          job.done(null, result);
        })
        .catch((err) => {
          activeJobs.delete(pId);
          job.done(err);
        });

      activeJobs.set(pId, jobPromise);
    });
  }

  async function loop() {
    while (running) {
      const started = Date.now();
      await run();
      const duration = Date.now() - started;

      if (duration < poolInternvalInMs && running) {
        loopDelayPromise = delay(poolInternvalInMs - duration);
        await loopDelayPromise;
      }
    }

    // wait for all active jobs to finish
    await Promise.all(Array.from(activeJobs.values()));
  }

  function notify() {
    if (loopDelayPromise) {
      loopDelayPromise.clear();
    }
  }

  function start() {
    running = true;
    loopPromise = loop();
  }

  async function stop() {
    running = false;
    await loopPromise;
  }

  start();

  return {
    start,
    notify,
    stop,
  };
}
