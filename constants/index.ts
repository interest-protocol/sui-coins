import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { SUI_MAINNET_CHAIN, SUI_TESTNET_CHAIN } from '@mysten/wallet-standard';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import {
  ADASVG,
  AVAXSVG,
  BNBSVG,
  BTCSVG,
  CELOSVG,
  DOGESVG,
  ETHSVG,
  FLOKISVG,
  FTMSVG,
  MATICSVG,
  SUISVG,
  USDCSVG,
  USDTSVG,
} from '@/svg';

export const MAX_NUMBER_INPUT_VALUE = 9000000000000000;

export const LOCAL_STORAGE_VERSION = 'v1';

export enum Network {
  MAINNET = 'sui:mainnet',
  TESTNET = 'sui:testnet',
}

export const DISPLAY_NETWORK = {
  [Network.MAINNET]: 'Mainnet',
  [Network.TESTNET]: 'Testnet',
};

export const EXPLORER_URL = {
  [SUI_MAINNET_CHAIN]: (complement: string) =>
    `https://suiexplorer.com/${complement}`,
  [SUI_TESTNET_CHAIN]: (complement: string) =>
    `https://suiexplorer.com/${complement}?network=testnet`,
} as Record<Network, (complement: string) => string>;

export enum TOKEN_SYMBOL {
  SUI = 'SUI',
  ETH = 'ETH',
  USDC = 'USDC',
}

export const MAINNET_BASE_COINS = {
  SUI: SUI_TYPE_ARG,
  ETH_WORMHOLE_USDC:
    '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
  NATIVE_WORMHOLE_ETH:
    '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
  ETH_WORMHOLE_USDT:
    '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
  NATIVE_WORMHOLE_WBNB:
    '0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f::coin::COIN',
  NATIVE_WORMHOLE_WAVAX:
    '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766::coin::COIN',
  NATIVE_WORMHOLE_WFTM:
    '0x6081300950a4f1e2081580e919c210436a1bed49080502834950d31ee55a2396::coin::COIN',
  NATIVE_WORMHOLE_CELO:
    '0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f::coin::COIN',
  NATIVE_WORMHOLE_WMATIC:
    '0xdbe380b13a6d0f5cdedd58de8f04625263f113b3f9db32b3e1983f49e2841676::coin::COIN',
  NATIVE_WORMHOLE_SOL:
    '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN',
  BSC_WORMHOLE_ADA:
    '0x4eac6573f65e7db5aea5a23e1335993a57e088dcd4aff7934059d9a6311d8655::coin::COIN',
  BSC_WORMHOLE_BTCB:
    '0x5cc7b6ed0ce0d43d08667793f6efe7a34d678a780755dc37ea8bfa8805f63327::coin::COIN',
  BSC_WORMHOLE_USDT:
    '0x603b488c87e0d1df64560a61418c87238d440a29ee39bbd757b0c92d38a35c7c::coin::COIN',
  BSC_WORMHOLE_USDC:
    '0x909cba62ce96d54de25bec9502de5ca7b4f28901747bbf96b76c2e63ec5f1cba::coin::COIN',
  BSC_WORMHOLE_ETH:
    '0x5029d5a94429a73b8036cd67192d9c5e09bbc2c0fee942d50075a9edba66744f::coin::COIN',
  BSC_WORMHOLE_FLOKI:
    '0xbcbbd5c23edf35fc279e21ebc129a1187dbfa5b086c63a8e7ff202865888b27b::coin::COIN',
  BSC_WORMHOLE_DOGE:
    '0xd399b358bd0e835000f6caa8c771a7d186499b6e62d413c2fd6cfed709689f28::coin::COIN',
  ETH_CELER_WETH:
    '0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_weth_coin::CELER_WETH_COIN',
  ETH_CELER_WBTC:
    '0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_wbtc_coin::CELER_WBTC_COIN',
  ETH_CELER_USDC:
    '0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_usdc_coin::CELER_USDC_COIN',
  ETH_CELER_USDT:
    '0x94e7a8e71830d2b34b3edaa195dc24c45d142584f06fa257b73af753d766e690::celer_usdt_coin::CELER_USDT_COIN',
};

export const MAINNET_COINS_INFO: Record<
  string,
  { origin: string | null; bridge: 'celer' | 'wormhole' | null }
> = {
  [MAINNET_BASE_COINS.SUI]: {
    origin: null,
    bridge: null,
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ETH]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.ETH_CELER_WETH]: {
    origin: null,
    bridge: 'celer',
  },
  [MAINNET_BASE_COINS.ETH_CELER_USDC]: {
    origin: 'ETH',
    bridge: 'celer',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDC]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDC]: {
    origin: 'ETH',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.ETH_CELER_USDT]: {
    origin: 'ETH',
    bridge: 'celer',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_USDT]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.ETH_WORMHOLE_USDT]: {
    origin: 'ETH',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.ETH_CELER_WBTC]: {
    origin: 'ETH',
    bridge: 'celer',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_ADA]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM]: {
    origin: null,
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
  [MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI]: {
    origin: 'BSC',
    bridge: 'wormhole',
  },
};

export const TOKEN_ICONS: Record<Network, Record<string, FC<SVGProps>>> = {
  [Network.TESTNET]: {
    SUI: SUISVG,
    ETH: ETHSVG,
    USDC: USDCSVG,
    USDT: USDTSVG,
    BTC: BTCSVG,
    ADA: ADASVG,
    BNB: BNBSVG,
    AVAX: AVAXSVG,
    CELO: CELOSVG,
    MATIC: MATICSVG,
    FTM: FTMSVG,
    DOGE: DOGESVG,
    FLOKI: FLOKISVG,
  },
  [Network.MAINNET]: {
    [MAINNET_BASE_COINS.SUI]: SUISVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_ETH]: ETHSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_ETH]: ETHSVG,
    [MAINNET_BASE_COINS.ETH_CELER_WETH]: ETHSVG,
    [MAINNET_BASE_COINS.ETH_CELER_USDC]: USDCSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_USDC]: USDCSVG,
    [MAINNET_BASE_COINS.ETH_WORMHOLE_USDC]: USDCSVG,
    [MAINNET_BASE_COINS.ETH_CELER_USDT]: USDTSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_USDT]: USDTSVG,
    [MAINNET_BASE_COINS.ETH_WORMHOLE_USDT]: USDTSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_BTCB]: BTCSVG,
    [MAINNET_BASE_COINS.ETH_CELER_WBTC]: BTCSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_ADA]: ADASVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WBNB]: BNBSVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WAVAX]: AVAXSVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_CELO]: CELOSVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WMATIC]: MATICSVG,
    [MAINNET_BASE_COINS.NATIVE_WORMHOLE_WFTM]: FTMSVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_DOGE]: DOGESVG,
    [MAINNET_BASE_COINS.BSC_WORMHOLE_FLOKI]: FLOKISVG,
  },
};

export const AIRDROP_SEND_CONTRACT = {
  [SUI_MAINNET_CHAIN]:
    '0x8bd272a53ed81d42c0e325546ecaac3a90dbb0c048a0da1ccd99ef2d607a0898',
  [SUI_TESTNET_CHAIN]:
    '0xfaa73f744aac0e67eab8e4b631dfc69430e329a4b28a87296f6f1f2ab9a3012f',
};

export const TOAST_DURATION = 10000;

// TODO: object ids
export const OBJECT_RECORD = {
  [Network.TESTNET]: {
    DEX_PACKAGE_ID:
      '0xd15fcc9307dcf822a6ec40950b8b8331ae2367c4455c568296ed4e1eb8527a75',
    DEX_POOLS:
      '0x4637ab864aaee41bfa12f0ebf5588d1e91a753f43fe46303f6d93f57d151bd05',
    DEX_CORE_STORAGE:
      '0x065a58d3e0e41717c7d0b08d09928b2251d3f8f8b0d1479f092e15635969b8be',
    DEX_MASTER_CHEF_STORAGE:
      '0xefc82c6a4d8b6d1b2e6421fa7640e0befb14c8f7e862360b948cbff0fbd5fba3',
    DEX_MASTER_CHEF_ACCOUNT_STORAGE:
      '0xdf5cef4c924f0cbd874ff12a2a7aa32673c9f80722fd781cc66fab11bdf155eb',
    DEX_QUOTE_PACKAGE_ID:
      '0xfe3d9d1fbc06b915e9a546b9d38a3e622850fe77cb198f3d8f822f919365a8b9',
    UTILS_PACKAGE_ID:
      '0xfe3d9d1fbc06b915e9a546b9d38a3e622850fe77cb198f3d8f822f919365a8b9',
  },
  [Network.MAINNET]: {
    DEX_PACKAGE_ID:
      '0x5c45d10c26c5fb53bfaff819666da6bc7053d2190dfa29fec311cc666ff1f4b0',
    DEX_POOLS:
      '0x108779144605a44e4b5447118b711f0b17adf6168cc9b08551d33daca58098e3',
    DEX_CORE_STORAGE:
      '0xdf2ee39f28fdf4bc5d5b5dc89926ac121839f8594fa51b2383a14cb99ab25a77',
    DEX_MASTER_CHEF_STORAGE:
      '0xbf3574ae177272809a7ee8f16c68db8fb832d4b10cb5febc477f90baba5ab6dd',
    DEX_MASTER_CHEF_ACCOUNT_STORAGE:
      '0x23fd9726a20709b6f3a59ba676a1d7bfede607ebeb011f888bb33de4f8f44e32',
    DEX_QUOTE_PACKAGE_ID:
      '0xd3f17406b17aa93f634e486a76938532e49f04345e59c3d250c9ebce79a0263f',
    UTILS_PACKAGE_ID:
      '0xd3f17406b17aa93f634e486a76938532e49f04345e59c3d250c9ebce79a0263f',
  },
};

export * from './routes';
export * from './wrapper-variants';
