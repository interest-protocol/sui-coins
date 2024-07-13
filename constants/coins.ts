import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { CoinData } from '@/interface';

export const MOVE_TYPE_ARG = '0x2::move::MOVE';

const MOVEMENT_MOCK_COINS_PACKAGE =
  '0x2e92e323161b7128012270910d55ba19033e193fc7a7af37810e280853d3926e';

export const BTC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::btc::BTC`;

export const ETH_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::eth::ETH`;

export const USDC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdc::USDC`;

export const USDT_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdt::USDT`;

export const RUCO_TYPE =
  '0x935aae204191927c7f1586a11c011da5fafb57fa51bd1df60484954c18862891::ruco::RUCO';

export const TREASURY_CAP_MAP = {
  [USDC_TYPE]:
    '0xaea0c4e0b0940fe832b3369e5cfdca218a7c067f5fe5b8514bf9f7c6f7437f40',
  [ETH_TYPE]:
    '0x8ed18d4f15991b3d36e60e7b7ca088e6ff2b08797f308045cdef665f67bc91e6',
  [BTC_TYPE]:
    '0x6cdbf86e99ee99d373d1d5d70189e505a9a21b77cc103f82daf77c0e0266e7a9',
  [USDT_TYPE]:
    '0x6cd5b46b192da614e77191f6de15b91d56a7b40b6638b054be12501c76ca6b2c',
} as Record<string, string>;

export const FAUCET_AMOUNT = {
  [USDC_TYPE]: '5000000000',
  [ETH_TYPE]: '5000000000',
  [BTC_TYPE]: '100000000',
  [USDT_TYPE]: '7000000000000',
} as Record<string, string>;

export const FAUCET_COINS: ReadonlyArray<CoinData> = [
  {
    decimals: 9,
    symbol: 'MOVE',
    type: SUI_TYPE_ARG,
  },
  {
    decimals: 9,
    symbol: 'BTC',
    type: BTC_TYPE,
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
  {
    decimals: 9,
    symbol: 'USDT',
    type: USDT_TYPE,
  },
];

export const COINS: ReadonlyArray<CoinData> = [
  ...FAUCET_COINS,
  {
    decimals: 9,
    symbol: 'RUCO',
    type: RUCO_TYPE,
  },
];

export const COINS_MAP: Record<string, CoinData> = {
  [SUI_TYPE_ARG]: {
    decimals: 9,
    symbol: 'MOVE',
    type: SUI_TYPE_ARG,
  },
  [BTC_TYPE]: {
    decimals: 9,
    symbol: 'BTC',
    type: BTC_TYPE,
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
  [USDT_TYPE]: {
    decimals: 9,
    symbol: 'USDT',
    type: USDT_TYPE,
  },
  [RUCO_TYPE]: {
    decimals: 9,
    symbol: 'RUCO',
    type: RUCO_TYPE,
  },
};

export const PRICE_BLACKLIST = ['RUCO'];
