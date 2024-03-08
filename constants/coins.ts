import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { TOKEN_SYMBOL } from '@/lib';
import { ETHSVG, MovSVG, USDCSVG } from '@/svg';

export const ETH_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::eth::ETH';

export const USDC_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::usdc::USDC';

export const SC_V_MOV_ETH =
  '0x1f25cf55789981cd5b0b0c9f0449f4c8ae23c4c3f8f823a7cd06749017323162::ipx_v_sui_eth::IPX_V_SUI_ETH';

export const SC_V_ETH_USDC =
  '0x1f25cf55789981cd5b0b0c9f0449f4c8ae23c4c3f8f823a7cd06749017323162::ipx_v_eth_usdc::IPX_V_ETH_USDC';

export const COINS = [
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.MOV,
    type: SUI_TYPE_ARG,
  },
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.ETH,
    type: ETH_TYPE,
  },
  {
    decimals: 9,
    symbol: TOKEN_SYMBOL.USDC,
    type: USDC_TYPE,
  },
];

export const COINS_MAP = {
  [SUI_TYPE_ARG]: {
    decimals: 9,
    symbol: TOKEN_SYMBOL.MOV,
    type: SUI_TYPE_ARG,
  },
  [ETH_TYPE]: {
    decimals: 9,
    symbol: TOKEN_SYMBOL.ETH,
    type: ETH_TYPE,
  },
  [USDC_TYPE]: {
    decimals: 9,
    symbol: TOKEN_SYMBOL.USDC,
    type: USDC_TYPE,
  },
};

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
    name: 'MOVE',
    symbol: 'MOV',
  },
  [SC_V_ETH_USDC]: {
    decimals: 9,
    name: 'sc-v-ETH/USDC',
    symbol: 'sc-v-ETH/USDC',
  },
  [SC_V_MOV_ETH]: {
    decimals: 9,
    name: 'sc-v-MOV/ETH',
    symbol: 'sc-v-MOV/ETH',
  },
};

export const BASE_COINS = [ETH_TYPE];

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}

export const REGISTRY_POOLS = {
  [ETH_TYPE]: {
    [SUI_TYPE_ARG]: {
      poolId:
        '0x02f381358cd60a96665076b60cfc74c71d675d0b042e24436a7f6ae2fef59ab9',
      lpCoinType: SC_V_MOV_ETH,
    },
    [USDC_TYPE]: {
      poolId:
        '0x55f1e9bde96624a0c150ccb9b075bed7461ed652bb5c7b94c10fab32a1325dd3',
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [USDC_TYPE]: {
    [ETH_TYPE]: {
      poolId:
        '0x55f1e9bde96624a0c150ccb9b075bed7461ed652bb5c7b94c10fab32a1325dd3',
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [SUI_TYPE_ARG]: {
    [ETH_TYPE]: {
      poolId:
        '0x02f381358cd60a96665076b60cfc74c71d675d0b042e24436a7f6ae2fef59ab9',
      lpCoinType: SC_V_MOV_ETH,
    },
  },
} as Record<string, Record<string, RegistryPool>>;

export const COINS_SVG_MAP_V2 = {
  [ETH_TYPE]: ETHSVG,
  [USDC_TYPE]: USDCSVG,
  [SUI_TYPE_ARG]: MovSVG,
  default: MovSVG,
};
