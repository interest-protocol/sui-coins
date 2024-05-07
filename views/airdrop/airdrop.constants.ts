import { normalizeSuiAddress } from '@mysten/sui.js/dist/cjs/utils';

export const RATE_LIMIT_DELAY = 5000;

export const BATCH_SIZE = 500;

export const AIRDROP_BLACKLIST = [normalizeSuiAddress('0x0')];
