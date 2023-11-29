export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export enum Network {
  M2 = 'movement:m2',
}

export const DISPLAY_NETWORK = {
  [Network.M2]: 'M2',
};

export const EXPLORER_URL = {
  [Network.M2]: 'https://explorer.movementlabs.xyz/',
} as Record<Network, string>;

export const TOAST_DURATION = 10000;

export * from './routes';
export * from './wrapper-variants';
