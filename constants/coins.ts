import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { TOKEN_SYMBOL } from '@/lib';
import { ETHSVG, MovSVG, USDCSVG } from '@/svg';

export const ETH_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::eth::ETH';

export const USDC_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::usdc::USDC';

export const SC_V_MOV_ETH =
  '0xe374195718ad4e47fc69952e903afbb8188de626714ad8e14aeb5a63483fc3e1::sc_v_sui_eth::SC_V_SUI_ETH';

export const SC_V_ETH_USDC =
  '0xe374195718ad4e47fc69952e903afbb8188de626714ad8e14aeb5a63483fc3e1::sc_v_eth_usdc::SC_V_ETH_USDC';

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
        '0x14d6a062e700fd5174cefbf009dc3406cc8963d468b610857820ac97418fbc79',
      lpCoinType: SC_V_MOV_ETH,
    },
    [USDC_TYPE]: {
      poolId:
        '0x76ec4dcb2d12131f471a872a87a3b3e0e0415b88ec819e8fb4fddcae61e852a8',
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [USDC_TYPE]: {
    [ETH_TYPE]: {
      poolId:
        '0x76ec4dcb2d12131f471a872a87a3b3e0e0415b88ec819e8fb4fddcae61e852a8',
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [SUI_TYPE_ARG]: {
    [ETH_TYPE]: {
      poolId:
        '0x14d6a062e700fd5174cefbf009dc3406cc8963d468b610857820ac97418fbc79',
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
