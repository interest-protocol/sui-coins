import { ETH_TYPE, USDC_TYPE } from './coins';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export enum Network {
  DEVNET = 'm2:devnet',
}

export const DISPLAY_NETWORK = {
  [Network.DEVNET]: 'Devnet',
};

export const LOCAL_STORAGE_VERSION = 'v3';

export const RPC_URL = {
  [Network.DEVNET]: 'https://devnet.m2.movementlabs.xyz:443',
};

export const FAUCET_URL = {
  [Network.DEVNET]: 'https://devnet.m2.movementlabs.xyz/faucet',
};

export const CONTROLLERS_MAP: Record<string, string> = {
  [ETH_TYPE]:
    '0x53c8f4ed74e72f0049c7a0d1eac57d48f7d1e7aa21d1bafbc9ae71b3b5607eb5',
  [USDC_TYPE]:
    '0x58c1a9fbb1eeed1b613295b632c1a75e6fda2e2d54bdcfd5889c0537b1c9e600',
};

export const EXPLORER_URL = {
  [Network.DEVNET]: (path: string) =>
    `https://suiexplorer.com/${path}?network=https%3A%2F%2Fsui.movementlabs.xyz%2F`,
} as Record<Network, (path: string) => string>;

export const TOAST_DURATION = 10000;

export * from './routes';
export * from './wrapper-variants';
