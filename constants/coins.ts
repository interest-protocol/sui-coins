import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { LocalCoinMetadata } from '@/interface';

const MOVEMENT_MOCK_COINS_PACKAGE =
  '0xdf4cfd011bd3055d54ed1e1d9036adec0dcb635e4bca6f4ca6930206442a7497';

export const BTC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::btc::BTC`;

export const ETH_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::eth::ETH`;

export const USDC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdc::USDC`;

export const USDT_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdt::USDT`;

export const TREASURY_CAP_MAP = {
  [USDC_TYPE]:
    '0x2c58686019d64f6885c19f8de66887d56fba73ce7bb8517ca70f17e5c2622e0f',
  [ETH_TYPE]:
    '0x2b39c6e7c3b0e12f2d649b96b321f2943c97a60563e9afb0304d50863f7b5315',
  [BTC_TYPE]:
    '0x147f4494f94a603c85256143c3b9164f9aeecc1e9db4208c5f2881324a356efc',
  [USDT_TYPE]:
    '0x0d76d311a9a2a24f6724d3bfb4fbab81a6962eed53ba0c9454a69d7e81ad98d3',
} as Record<string, string>;

export const FAUCET_AMOUNT = {
  [USDC_TYPE]: '5000000000',
  [ETH_TYPE]: '5000000000',
  [BTC_TYPE]: '100000000',
  [USDT_TYPE]: '7000000000000',
} as Record<string, string>;

export const COINS = [
  {
    decimals: 9,
    symbol: 'MOVE',
    type: SUI_TYPE_ARG,
  },
  {
    decimals: 9,
    symbol: 'ETH',
    type: ETH_TYPE,
  },
  {
    decimals: 6,
    symbol: 'USDC',
    type: USDC_TYPE,
  },
];

export const COINS_MAP = {
  [SUI_TYPE_ARG]: {
    decimals: 9,
    symbol: 'MOVE',
    type: SUI_TYPE_ARG,
  },
  [ETH_TYPE]: {
    decimals: 9,
    symbol: 'ETH',
    type: ETH_TYPE,
  },
  [USDC_TYPE]: {
    decimals: 6,
    symbol: 'USDC',
    type: USDC_TYPE,
  },
} as Record<string, LocalCoinMetadata>;
