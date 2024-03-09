import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { TOKEN_SYMBOL } from '@/lib';
import { ETHSVG, MOVSVG, USDCSVG } from '@/svg';

import { Network } from './network';

export const ETH_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::eth::ETH';

export const USDC_TYPE =
  '0x7a737fa2643f953d0adb669ab4274ac250c597c47fae6d1af878f38c3b92b370::usdc::USDC';

export const SC_V_MOV_ETH =
  '0xe374195718ad4e47fc69952e903afbb8188de626714ad8e14aeb5a63483fc3e1::sc_v_sui_eth::SC_V_SUI_ETH';

export const SC_V_ETH_USDC =
  '0xe374195718ad4e47fc69952e903afbb8188de626714ad8e14aeb5a63483fc3e1::sc_v_eth_usdc::SC_V_ETH_USDC';

export const COIN_TYPE_TO_SYMBOL: Record<Network, Record<string, string>> = {
  [Network.DEVNET]: {
    [SUI_TYPE_ARG]: TOKEN_SYMBOL.MOV,
    [ETH_TYPE]: TOKEN_SYMBOL.ETH,
    [USDC_TYPE]: TOKEN_SYMBOL.USDC,
  },
  [Network.TESTNET]: {},
};

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

export const BASE_COINS = {
  [Network.DEVNET]: [ETH_TYPE],
  [Network.TESTNET]: [],
};

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
  [SUI_TYPE_ARG]: MOVSVG,
  default: MOVSVG,
};

export const TESTNET_BASE_COINS = {
  ETH: '0xb8656a09a489819f07c444cb4a4a61a3b482a5ea994fd71b0a643ffc1c2f2dd0::eth::ETH',
  BTC: '0xb8656a09a489819f07c444cb4a4a61a3b482a5ea994fd71b0a643ffc1c2f2dd0::btc::BTC',
  MOV: '0xb8656a09a489819f07c444cb4a4a61a3b482a5ea994fd71b0a643ffc1c2f2dd0::mov::MOV',
  USDC: '0xb8656a09a489819f07c444cb4a4a61a3b482a5ea994fd71b0a643ffc1c2f2dd0::usdc::USDC',
};

export const DEVNET_BASE_COINS = {
  NATIVE_WORMHOLE_ETH:
    '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
  ETH_WORMHOLE_USDC:
    '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
  SC_V_MOV_ETH:
    '0xe374195718ad4e47fc69952e903afbb8188de626714ad8e14aeb5a63483fc3e1::sc_v_ move_eth::SC_V_MOV_ETH',
};

export const TOKEN_ICONS: Record<
  Network,
  Record<string, string | FC<SVGProps>>
> = {
  [Network.TESTNET]: {
    ETH: ETHSVG,
    USDC: USDCSVG,
    MOV: MOVSVG,
  },
  [Network.DEVNET]: {
    ETH: ETHSVG,
    USDC: USDCSVG,
    MOV: MOVSVG,
  },
};
