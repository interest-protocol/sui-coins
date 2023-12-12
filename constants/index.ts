import { SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN } from '@mysten/wallet-standard';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v1';

export enum Network {
  MAINNET = 'sui:mainnet',
  TESTNET = 'sui:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.MAINNET]: 'Mainnet',
  [Network.TESTNET]: 'Testnet',
};

export const EXPLORER_URL = {
  [SUI_MAINNET_CHAIN]: 'https://suivision.xyz',
  [SUI_TESTNET_CHAIN]: 'https://testnet.suivision.xyz',
} as Record<Network, string>;

export const TOAST_DURATION = 10000;

export * from './routes';
export * from './wrapper-variants';
