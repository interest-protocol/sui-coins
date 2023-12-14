import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN } from '@mysten/wallet-standard';

import { ETHSVG, SUISVG, USDCSVG } from '@/svg';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

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

export enum TOKEN_SYMBOL {
  SUI = 'SUI',
  ETH = 'ETH',
  USDC = 'USDC',
}

// TODO: Replace Types
export const ETH_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::eth::ETH';

export const USDC_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::usdc::USDC';

export const COIN_TYPE = {
  [TOKEN_SYMBOL.SUI]: SUI_TYPE_ARG,
  [TOKEN_SYMBOL.ETH]: ETH_TYPE,
  [TOKEN_SYMBOL.USDC]: USDC_TYPE,
};

export const TOKEN_ICONS = {
  [TOKEN_SYMBOL.SUI]: SUISVG,
  [TOKEN_SYMBOL.ETH]: ETHSVG,
  [TOKEN_SYMBOL.USDC]: USDCSVG,
};

export const COINS = [
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.SUI,
    type: COIN_TYPE[TOKEN_SYMBOL.SUI],
  },
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.ETH,
    type: COIN_TYPE[TOKEN_SYMBOL.ETH],
  },
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.USDC,
    type: COIN_TYPE[TOKEN_SYMBOL.USDC],
  },
];

export const AIRDROP_SEND_CONTRACT = {
  [SUI_MAINNET_CHAIN]:
    '0xfaa73f744aac0e67eab8e4b631dfc69430e329a4b28a87296f6f1f2ab9a3012f',
  [SUI_TESTNET_CHAIN]:
    '0xfaa73f744aac0e67eab8e4b631dfc69430e329a4b28a87296f6f1f2ab9a3012f',
};

export const TOAST_DURATION = 10000;

export * from './wrapper-variants';
