import { RATE_LIMIT_DELAY } from '@/views/airdrop/airdrop.constants';

export const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const pauseUtilNextTx = (txInitTimeMS: number) =>
  sleep(RATE_LIMIT_DELAY - (Date.now() - txInitTimeMS));
