import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { CoinData } from '@/interface';

export const MOVE_TYPE_ARG = '0x2::move::MOVE';

const MOVEMENT_MOCK_COINS_PACKAGE =
  '0x6c4e7af6322e89ac676b463e05399607285e8aa64d092cfca849b058cba798af';

export const BTC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::btc::BTC`;

export const ETH_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::eth::ETH`;

export const USDC_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdc::USDC`;

export const USDT_TYPE = `${MOVEMENT_MOCK_COINS_PACKAGE}::usdt::USDT`;

export const RUCO_TYPE =
  '0x66e2b5b7888b2b04c94ef12f8a035d144c2397bfa022a3ea6cae696d9d833957::ruco::RUCO';

export const TREASURY_CAP_MAP = {
  [USDC_TYPE]:
    '0x21101a4b9c057b28582476a1a4899808ceb6a140dd1b7052195cc88274892427',
  [ETH_TYPE]:
    '0x2c8658587b1ee7abf01dc790f14530f37f786cd0d798834637e348b2e20f8ac3',
  [BTC_TYPE]:
    '0xfa97291c69f67650d832ab67f2a445769827b75e35018ed302c83bd889eacf44',
  [USDT_TYPE]:
    '0xa3ca4a03d3801b5dc26e2cc68e16e84b3904a8750a13a2d594a840b708d3ea4c',
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
