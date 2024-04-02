import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { Network } from '@/constants/network';
import { RegistryPool } from '@/interface';
import {
  PoolCardProps,
  PoolTypeEnum,
} from '@/views/pools/pool-card/pool-card.types';

import {
  COINS,
  ETH_TYPE,
  SC_V_ETH_USDC,
  SC_V_MOV_ETH,
  USDC_TYPE,
} from './coins';

export enum DexName {
  Interest = 'interest',
}

export const RECOMMENDED_POOLS: Record<
  Network,
  ReadonlyArray<PoolCardProps>
> = {
  [Network.DEVNET]: [
    {
      dex: DexName.Interest,
      tokens: [COINS[0], COINS[1], COINS[2]],
      poolObjectId: COINS[0].type,
      lpCoin: COINS[0],
      stable: true,
      poolType: PoolTypeEnum.amm,
    },
    {
      dex: DexName.Interest,
      tokens: [COINS[1], COINS[2]],
      poolObjectId: COINS[1].type,
      lpCoin: COINS[1],
      stable: false,
      poolType: PoolTypeEnum.clamm,
    },
    {
      dex: DexName.Interest,
      tokens: [COINS[2], COINS[0]],
      poolObjectId: COINS[2].type,
      lpCoin: COINS[2],
      stable: true,
      poolType: PoolTypeEnum.clamm,
    },
  ],
  [Network.TESTNET]: [],
};

export const REGISTRY_POOLS: Record<
  Network,
  Record<string, Record<string, RegistryPool>>
> = {
  [Network.DEVNET]: {
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
  },
  [Network.TESTNET]: {},
};
