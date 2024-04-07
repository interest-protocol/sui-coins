import { Network } from '@/constants/network';
import { PoolTypeEnum } from '@/interface';
import { PoolCardProps } from '@/views/pools/pool-card/pool-card.types';

import { COINS } from './coins';

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
