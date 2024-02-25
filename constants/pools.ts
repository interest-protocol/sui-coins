import { Network } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { PoolCardProps } from '@/views/pools/pool-card/pool-card.types';

import { COINS } from './coins';

export const RECOMMENDED_POOLS: Record<
  Network,
  ReadonlyArray<PoolCardProps>
> = {
  [Network.DEVNET]: [
    {
      dex: 'interest',
      token0: COINS[0],
      token1: COINS[1],
      poolObjectId: `${ZERO_BIG_NUMBER}`,
      lpCoin: COINS[0],
      stable: false,
    },
    {
      dex: 'interest',
      token0: COINS[1],
      token1: COINS[2],
      poolObjectId: `${ZERO_BIG_NUMBER}`,
      lpCoin: COINS[1],
      stable: false,
    },
    {
      dex: 'interest',
      token0: COINS[2],
      token1: COINS[0],
      poolObjectId: `${ZERO_BIG_NUMBER}`,
      lpCoin: COINS[2],
      stable: false,
    },
  ],
};
