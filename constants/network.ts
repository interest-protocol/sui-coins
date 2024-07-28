export enum Network {
  DEVNET = 'm2:devnet',
  IMOLA_TESTNET = 'baku:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.IMOLA_TESTNET]: 'Baku Testnet',
  [Network.DEVNET]: 'M2 Devnet',
};
