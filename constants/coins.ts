import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { TOKEN_SYMBOL } from '@/lib';

export const COIN_METADATA = {
  [SUI_TYPE_ARG]: {
    name: 'Sui',
    decimals: 9,
    symbol: TOKEN_SYMBOL.SUI,
  },
};
