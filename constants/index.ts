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
  '0x6e5ce673cbbad51c6d795a69caa7cb4dabf9c69569d9291d0808bd65497de6eb';

export const USDC_CONTROLLER =
  '0x87e95ea37b5b94f86a89c61f37ce906875c2c576adee89349231b086194315e2';

export const EXPLORER_URL = {
  [Network.M2]: 'https://explorer.movementlabs.xyz/',
} as Record<Network, string>;

export const TOAST_DURATION = 10000;

export * from './routes';
export * from './wrapper-variants';
