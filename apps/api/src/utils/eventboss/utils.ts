import delay from 'delay';

export const resolveWithinSeconds = async (promise: Promise<any>, seconds: number) => {
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
