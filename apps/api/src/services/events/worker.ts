import delay from 'delay';

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

interface WorkerItem<R> {
  id: string;
  expire_in_seconds: number;
  done: (err?: Error | null, data?: R) => void;
}

export function createWorker<T extends WorkerItem<any>>(props: {
  fetchSize: number;
  maxConcurrency: number;
  fetch: (props: { amount: number }) => Promise<Array<T>>;
  handler: (event: T) => Promise<any>;
  poolInternvalInMs: number;
}) {
  const { handler, maxConcurrency, poolInternvalInMs, fetch, fetchSize } = props;
  let running = false;
  const activeJobs = new Map<string | number, Promise<any>>();
  let loopPromise: Promise<any>;
  let loopDelayPromise: delay.ClearablePromise<void> | null = null;

  async function run() {
    if (activeJobs.size >= maxConcurrency) {
      return;
    }

    const newJobs = await fetch({ amount: Math.min(maxConcurrency - activeJobs.size, fetchSize) });

    if (!newJobs) {
      return;
    }

    // run jobs
    newJobs.forEach((job) => {
      const jobPromise = resolveWithinSeconds(handler(job), job.expire_in_seconds + 1)
        .then((result) => {
          activeJobs.delete(job.id);
          job.done(null, result);
        })
        .catch((err) => {
          activeJobs.delete(job.id);
          job.done(err);
        });

      activeJobs.set(job.id, jobPromise);
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
