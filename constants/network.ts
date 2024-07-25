export enum Network {
  DEVNET = 'm2:devnet',
  IMOLA_TESTNET = 'm2:imola:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.IMOLA_TESTNET]: 'Imola Testnet',
  [Network.DEVNET]: 'Devnet',
};
