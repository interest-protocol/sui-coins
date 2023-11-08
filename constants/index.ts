export * from './wrapper-variants';
export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;
import { SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN } from '@mysten/wallet-standard';

export const EXPLORER_URL = {
  [SUI_MAINNET_CHAIN]: 'https://suivision.xyz',
  [SUI_TESTNET_CHAIN]: 'https://testnet.suivision.xyz',
} as Record<`${string}:${string}`, string>;

export const TOAST_DURATION = 10000;
