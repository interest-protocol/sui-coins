import { Network } from './dapp';

export const EXPLORER_STORAGE_KEY = 'sui-coins-explorer';

export enum Explorer {
  SuiVision = 'sui-vision',
  SuiScan = 'sui-scan',
  Polymedia = 'polymedia',
}

export enum ExplorerMode {
  Object,
  Account,
  Transaction,
}

export const EXPLORERS = [
  Explorer.SuiVision,
  Explorer.SuiScan,
  Explorer.Polymedia,
];

export const EXPLORER_DISPLAY = {
  [Explorer.SuiVision]: 'Sui Vision',
  [Explorer.SuiScan]: 'Sui Scan',
  [Explorer.Polymedia]: 'Polymedia',
};

export const EXPLORER_URL_GETTER = {
  [Explorer.SuiVision]: {
    [Network.MAINNET]: (path: string) => `https://suivision.xyz/${path}`,
    [Network.TESTNET]: (path: string) =>
      `https://testnet.suivision.xyz/${path}`,
  },
  [Explorer.SuiScan]: {
    [Network.MAINNET]: (path: string) => `https://suiscan.xyz/mainnet/${path}`,
    [Network.TESTNET]: (path: string) => `https://suiscan.xyz/testnet/${path}`,
  },
  [Explorer.Polymedia]: {
    [Network.MAINNET]: (path: string) =>
      `https://explorer.polymedia.app/${path}`,
    [Network.TESTNET]: (path: string) =>
      `https://explorer.polymedia.app/${path}?network=testnet`,
  },
} as Record<Explorer, Record<Network, (path: string) => string>>;

export const EXPLORER_PATH_GETTER = {
  [Explorer.SuiVision]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `account/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `txblock/${value}`,
  },
  [Explorer.SuiScan]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `account/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `tx/${value}`,
  },
  [Explorer.Polymedia]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `address/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `txblock/${value}`,
  },
} as Record<Explorer, Record<ExplorerMode, (path: string) => string>>;
