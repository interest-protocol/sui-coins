import { normalizeSuiAddress } from '@mysten/sui.js/utils';

import { Network } from './network';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v5';

export const PAGE_SIZE = 50;

export const DEAD_ADDRESS = normalizeSuiAddress('0x0');

export const RPC_URL = {
  [Network.DEVNET]: 'https://sui.devnet.m2.movementlabs.xyz:443',
  [Network.TESTNET]: 'https://devnet.baku.movementlabs.xyz',
};

export const FAUCET_URL = {
  [Network.DEVNET]: 'https://sui.devnet.m2.movementlabs.xyz/faucet',
  [Network.TESTNET]: 'https://faucet.devnet.baku.movementlabs.xyz/faucet/web',
};

export const EXPLORER_URL = {
  [Network.DEVNET]: (path: string) =>
    `https://explorer.devnet.m2.movementlabs.xyz/${path}?network=devnet`,
  [Network.TESTNET]: (path: string) =>
    `https://explorer.devnet.baku.movementlabs.xyz/${path}`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export const EXCHANGE_FEE = 0.002;

export * from './coins';
export * from './network';
export * from './packages';
export * from './routes';
