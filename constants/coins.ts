import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { CoinData } from '@/interface';

import { Network } from './network';

export const MOVE_TYPE_ARG = '0x2::move::MOVE';

const MOVEMENT_MOCK_COINS_PACKAGE =
  '0x457abead7283c8af79b0902e71decf173f88624fe8dd2e76be97b6132c39e9c9';

const MOVEMENT_MOCK_IMOLA_PACKAGE =
  '0x8ac626e474c33520a815175649fefcbb272678c8c37a7b024e7171fa45d47711';

export const COIN_TYPES = {
  [Network.DEVNET]: {
    WBTC: `${MOVEMENT_MOCK_COINS_PACKAGE}::wbtc::WBTC`,
    WETH: `${MOVEMENT_MOCK_COINS_PACKAGE}::weth::WETH`,
    USDC: `${MOVEMENT_MOCK_COINS_PACKAGE}::usdc::USDC`,
    USDT: `${MOVEMENT_MOCK_COINS_PACKAGE}::usdt::USDT`,
    RUCO: '0x935aae204191927c7f1586a11c011da5fafb57fa51bd1df60484954c18862891::ruco::RUCO',
  },
  [Network.TESTNET]: {
    WBTC: `${MOVEMENT_MOCK_IMOLA_PACKAGE}::wbtc::WBTC`,
    WETH: `${MOVEMENT_MOCK_IMOLA_PACKAGE}::weth::WETH`,
    USDC: `${MOVEMENT_MOCK_IMOLA_PACKAGE}::usdc::USDC`,
    USDT: `${MOVEMENT_MOCK_IMOLA_PACKAGE}::usdt::USDT`,
    RUCO: '0xbcf97579863d0d299c00f718132fd85e138badedbe597201287ec6e2d7eb739f::ruco::RUCO',
  },
};

export const TREASURY_CAP_MAP: Record<Network, Record<string, string>> = {
  [Network.DEVNET]: {
    [COIN_TYPES[Network.DEVNET].USDC]:
      '0x1292ab377437c97bc6dfead6b502c0a40c1cdd84d3b5c7c98ad6a303bec52897',
    [COIN_TYPES[Network.DEVNET].WETH]:
      '0x2edacfae4858522ae6cff36d8acc05a255b9b4403bd7e56d9b0ca6664edc25be',
    [COIN_TYPES[Network.DEVNET].WBTC]:
      '0x0401a6b9b03b694d16fe9806389625beb6d801f64a188d39aecfc090c5dce2fd',
    [COIN_TYPES[Network.DEVNET].USDT]:
      '0x54e04baa0fa5bf840efb48e44afb1c388690e8d52cf874a012edaa5fa487ab27',
  },
  [Network.TESTNET]: {
    [COIN_TYPES[Network.TESTNET].USDC]:
      '0x6bad1a88caef6f9ea56680cd31315b2cfeb6018b105471320407559042e6d067',
    [COIN_TYPES[Network.TESTNET].WETH]:
      '0xe02ba3510a9240ba970aed72e0c6188989c3e6d6bd316edfa12bd04da8ebf675',
    [COIN_TYPES[Network.TESTNET].WBTC]:
      '0xd2c1127a16494f9df5b6f973baebd78e093d66b3c06463c4e930c8545a9b6df2',
    [COIN_TYPES[Network.TESTNET].USDT]:
      '0x8cacf2fd727720db5fc11006786fbcf69408decda4611921da791cc8ed844878',
  },
};

export const FAUCET_AMOUNT: Record<Network, Record<string, `${number}`>> = {
  [Network.DEVNET]: {
    [COIN_TYPES[Network.DEVNET].USDC]: '5000000000',
    [COIN_TYPES[Network.DEVNET].WETH]: '5000000000',
    [COIN_TYPES[Network.DEVNET].WBTC]: '100000000',
    [COIN_TYPES[Network.DEVNET].USDT]: '7000000000000',
  },
  [Network.TESTNET]: {
    [COIN_TYPES[Network.TESTNET].USDC]: '5000000000',
    [COIN_TYPES[Network.TESTNET].WETH]: '500000000',
    [COIN_TYPES[Network.TESTNET].WBTC]: '10000000',
    [COIN_TYPES[Network.TESTNET].USDT]: '7000000000',
  },
};

export const FAUCET_COINS: Record<Network, ReadonlyArray<CoinData>> = {
  [Network.DEVNET]: [
    {
      decimals: 9,
      symbol: 'MOVE',
      type: SUI_TYPE_ARG,
    },
    {
      decimals: 9,
      symbol: 'WBTC',
      type: COIN_TYPES[Network.DEVNET].WBTC as `0x${string}`,
    },
    {
      decimals: 9,
      symbol: 'WETH',
      type: COIN_TYPES[Network.DEVNET].WETH as `0x${string}`,
    },
    {
      decimals: 6,
      symbol: 'USDC',
      type: COIN_TYPES[Network.DEVNET].USDC as `0x${string}`,
    },
    {
      decimals: 9,
      symbol: 'USDT',
      type: COIN_TYPES[Network.DEVNET].USDT as `0x${string}`,
    },
  ],
  [Network.TESTNET]: [
    {
      decimals: 8,
      symbol: 'WBTC',
      type: COIN_TYPES[Network.TESTNET].WBTC as `0x${string}`,
    },
    {
      decimals: 8,
      symbol: 'WETH',
      type: COIN_TYPES[Network.TESTNET].WETH as `0x${string}`,
    },
    {
      decimals: 6,
      symbol: 'USDC',
      type: COIN_TYPES[Network.TESTNET].USDC as `0x${string}`,
    },
    {
      decimals: 6,
      symbol: 'USDT',
      type: COIN_TYPES[Network.TESTNET].USDT as `0x${string}`,
    },
  ],
};

export const COINS: Record<Network, ReadonlyArray<CoinData>> = {
  [Network.DEVNET]: [
    ...FAUCET_COINS[Network.DEVNET],
    {
      decimals: 9,
      symbol: 'RUCO',
      type: COIN_TYPES[Network.DEVNET].RUCO as `0x${string}`,
    },
  ],
  [Network.TESTNET]: [
    {
      decimals: 9,
      symbol: 'MOVE',
      type: SUI_TYPE_ARG,
    },
    ...FAUCET_COINS[Network.TESTNET],
    {
      decimals: 9,
      symbol: 'RUCO',
      type: COIN_TYPES[Network.TESTNET].RUCO as `0x${string}`,
    },
  ],
};

export const COINS_MAP: Record<Network, Record<string, CoinData>> = {
  [Network.DEVNET]: {
    [SUI_TYPE_ARG]: {
      decimals: 9,
      symbol: 'MOVE',
      type: SUI_TYPE_ARG,
    },
    [COIN_TYPES[Network.DEVNET].WBTC]: {
      decimals: 9,
      symbol: 'WBTC',
      type: COIN_TYPES[Network.DEVNET].WBTC as `0x${string}`,
    },
    [COIN_TYPES[Network.DEVNET].WETH]: {
      decimals: 9,
      symbol: 'WETH',
      type: COIN_TYPES[Network.DEVNET].WETH as `0x${string}`,
    },
    [COIN_TYPES[Network.DEVNET].USDC]: {
      decimals: 6,
      symbol: 'USDC',
      type: COIN_TYPES[Network.DEVNET].USDC as `0x${string}`,
    },
    [COIN_TYPES[Network.DEVNET].USDT]: {
      decimals: 9,
      symbol: 'USDT',
      type: COIN_TYPES[Network.DEVNET].USDT as `0x${string}`,
    },
    [COIN_TYPES[Network.DEVNET].RUCO]: {
      decimals: 9,
      symbol: 'RUCO',
      type: COIN_TYPES[Network.DEVNET].RUCO as `0x${string}`,
    },
  },
  [Network.TESTNET]: {
    [SUI_TYPE_ARG]: {
      decimals: 9,
      symbol: 'MOVE',
      type: SUI_TYPE_ARG,
    },
    [COIN_TYPES[Network.TESTNET].WBTC]: {
      decimals: 9,
      symbol: 'WBTC',
      type: COIN_TYPES[Network.TESTNET].WBTC as `0x${string}`,
    },
    [COIN_TYPES[Network.TESTNET].WETH]: {
      decimals: 9,
      symbol: 'WETH',
      type: COIN_TYPES[Network.TESTNET].WETH as `0x${string}`,
    },
    [COIN_TYPES[Network.TESTNET].USDC]: {
      decimals: 6,
      symbol: 'USDC',
      type: COIN_TYPES[Network.TESTNET].USDC as `0x${string}`,
    },
    [COIN_TYPES[Network.TESTNET].USDT]: {
      decimals: 9,
      symbol: 'USDT',
      type: COIN_TYPES[Network.TESTNET].USDT as `0x${string}`,
    },
    [COIN_TYPES[Network.TESTNET].RUCO]: {
      decimals: 9,
      symbol: 'RUCO',
      type: COIN_TYPES[Network.TESTNET].RUCO as `0x${string}`,
    },
  },
};

export const PRICE_BLACKLIST = ['RUCO'];
