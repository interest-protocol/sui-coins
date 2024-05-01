import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { LocalCoinMetadata } from '@/interface';

export const ETH_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::eth::ETH';

export const USDC_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::usdc::USDC';

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
