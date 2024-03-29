import { RATE_LIMIT_DELAY } from '@/views/airdrop/airdrop.constants';

export async function tryCatch<T>(
  promise: Promise<T>,
  onError: (e: unknown) => void,
  onFinally?: () => void
): Promise<T | undefined> {
  try {
    return await promise;
  } catch (error) {
    onError(error);
  } finally {
    if (onFinally) onFinally();
  }
}

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const pauseUtilNextTx = (txInitTimeMS: number) =>
  sleep(RATE_LIMIT_DELAY - (Date.now() - txInitTimeMS));
