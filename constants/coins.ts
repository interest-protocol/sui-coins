import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { TOKEN_SYMBOL } from '@/lib';

export const ETH_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::eth::ETH';

export const USDC_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::usdc::USDC';

export const COINS = [
  {
    symbol: TOKEN_SYMBOL.MOV,
    type: SUI_TYPE_ARG,
  },
  {
    symbol: TOKEN_SYMBOL.ETH,
    type: ETH_TYPE,
  },
  {
    symbol: TOKEN_SYMBOL.USDC,
    type: USDC_TYPE,
  },
];

export const COIN_METADATA = {
  [ETH_TYPE]: {
    decimals: 9,
    name: 'ETH',
    symbol: 'ETH',
  },
  [USDC_TYPE]: {
    decimals: 9,
    name: 'USDC',
    symbol: 'USDC',
  },
  [SUI_TYPE_ARG]: {
    decimals: 9,
    name: 'MOV',
    symbol: 'MOVE',
  },
};
