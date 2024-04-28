import { RATE_LIMIT_DELAY } from '@/views/airdrop/airdrop.constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop: any = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const asyncNoop = async () => {};

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const pauseUtilNextTx = (txInitTimeMS: number) =>
  sleep(RATE_LIMIT_DELAY - (Date.now() - txInitTimeMS));

export const swrFetcher = (url: string) => fetch(url).then((r) => r.json());
