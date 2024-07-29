export enum Network {
  DEVNET = 'm2:devnet',
  TESTNET = 'baku:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.TESTNET]: 'Baku Testnet',
  [Network.DEVNET]: 'M2 Devnet',
};
