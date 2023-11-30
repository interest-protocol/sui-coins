export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export enum Network {
  M2 = 'movement:m2',
}

export const DISPLAY_NETWORK = {
  [Network.M2]: 'M2',
};

export const LOCAL_STORAGE_VERSION = 'v3';

export const RPC_URL = 'https://sui.movementlabs.xyz:443';

export const FAUCET_URL = 'https://sui.movementlabs.xyz/faucet';

export const ETH_CONTROLLER =
  '0x53c8f4ed74e72f0049c7a0d1eac57d48f7d1e7aa21d1bafbc9ae71b3b5607eb5';

export const USDC_CONTROLLER =
  '0x58c1a9fbb1eeed1b613295b632c1a75e6fda2e2d54bdcfd5889c0537b1c9e600';

export const EXPLORER_URL = {
  [Network.M2]: 'https://explorer.movementlabs.xyz/',
} as Record<Network, string>;

export const TOAST_DURATION = 10000;

export * from './routes';
export * from './wrapper-variants';
