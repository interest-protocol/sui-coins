import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { LocalCoinMetadata, PoolTypeEnum } from '@/interface';
import { TOKEN_SYMBOL } from '@/lib';
import { ETHSVG, MOVSVG, USDCSVG } from '@/svg';

import { Network } from './network';

export const ETH_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::eth::ETH';

export const USDC_TYPE =
  '0x8e614b777730a3b481a5f30b53be062fc0c01f93c6fdfe9fb19ffbae7777b700::usdc::USDC';

export const SC_V_MOV_ETH =
  '0x1f25cf55789981cd5b0b0c9f0449f4c8ae23c4c3f8f823a7cd06749017323162::ipx_v_sui_eth::IPX_V_SUI_ETH';

export const SC_V_ETH_USDC =
  '0x1f25cf55789981cd5b0b0c9f0449f4c8ae23c4c3f8f823a7cd06749017323162::ipx_v_eth_usdc::IPX_V_ETH_USDC';

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
} as Record<string, LocalCoinMetadata>;

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

const MOV_ETH_POOL_ID =
  '0x02f381358cd60a96665076b60cfc74c71d675d0b042e24436a7f6ae2fef59ab9';

const USDC_ETH_POOL_ID =
  '0x21c4561fe02ca4ac4e9b1c705e9b1f9c052f7423f7d18053acca382749bb9a4f';

const MOV_ETH_STATE_ID =
  '0x58122defa03f590a88d8dd165c65e3ccfda7e8c660976f595ecb1c62d6f27281';

const USDC_ETH_STATE_ID =
  '0x21c4561fe02ca4ac4e9b1c705e9b1f9c052f7423f7d18053acca382749bb9a4f';

export const REGISTRY_POOLS = {
  [ETH_TYPE]: {
    [SUI_TYPE_ARG]: {
      poolId: MOV_ETH_POOL_ID,
      lpCoinType: SC_V_MOV_ETH,
      stateKey: MOV_ETH_STATE_ID,
    },
    [USDC_TYPE]: {
      poolId:
        '0x55f1e9bde96624a0c150ccb9b075bed7461ed652bb5c7b94c10fab32a1325dd3',
      stateKey: USDC_ETH_STATE_ID,
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [USDC_TYPE]: {
    [ETH_TYPE]: {
      poolId:
        '0x55f1e9bde96624a0c150ccb9b075bed7461ed652bb5c7b94c10fab32a1325dd3',
      stateKey: USDC_ETH_STATE_ID,
      lpCoinType: SC_V_ETH_USDC,
    },
  },
  [SUI_TYPE_ARG]: {
    [ETH_TYPE]: {
      poolId: MOV_ETH_POOL_ID,
      lpCoinType: SC_V_MOV_ETH,
      stateKey: MOV_ETH_STATE_ID,
    },
  },
} as Record<string, Record<string, RegistryPool>>;

export const POOLS_ARRAY = [MOV_ETH_STATE_ID, USDC_ETH_STATE_ID];

export const POOL_ID_TO_SYMBOL = {};

export const STATE_KEY_TO_POOL_ID = {
  '0x55f1e9bde96624a0c150ccb9b075bed7461ed652bb5c7b94c10fab32a1325dd3':
    USDC_ETH_POOL_ID,
  MOV_ETH_STATE_ID: MOV_ETH_POOL_ID,
} as Record<string, string>;

export const LP_COINS_MAP = {
  [Network.DEVNET]: {
    [SC_V_MOV_ETH]: {
      decimals: 18,
      type: SC_V_MOV_ETH,
      symbol: 'sc-v-MOV/ETH',
    },
    [SC_V_ETH_USDC]: {
      decimals: 18,
      type: SC_V_ETH_USDC,
      symbol: 'sc-v-ETH/USDC',
    },
  },
};

export const RECOMMENDED_POOLS = {
  [Network.DEVNET]: [
    {
      stable: false,
      poolType: PoolTypeEnum.amm,
      stateKey: MOV_ETH_STATE_ID,
      poolObjectId: MOV_ETH_POOL_ID,
      lpCoin: LP_COINS_MAP[Network.DEVNET][SC_V_MOV_ETH],
      tokens: [COINS_MAP[ETH_TYPE], COINS_MAP[SUI_TYPE_ARG]],
    },
    {
      stable: false,
      poolType: PoolTypeEnum.amm,
      stateKey: USDC_ETH_STATE_ID,
      poolObjectId: USDC_ETH_POOL_ID,
      lpCoin: LP_COINS_MAP[Network.DEVNET][SC_V_ETH_USDC],
      tokens: [COINS_MAP[ETH_TYPE], COINS_MAP[USDC_TYPE]],
    },
  ],
  [Network.TESTNET]: [],
};

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
  ETH: '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
  USDC: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
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
