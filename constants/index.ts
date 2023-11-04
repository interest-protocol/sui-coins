export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export enum Network {
  DEVNET = 'sui:devnet',
  TESTNET = 'sui:testnet',
  MAINNET = 'sui:mainnet',
}

export const EXPLORER_URL = {
  [Network.MAINNET]: 'https://suivision.xyz',
  [Network.TESTNET]: 'https://testnet.suivision.xyz',
  [Network.DEVNET]: '',
};

export const TOAST_DURATION = 10000;
