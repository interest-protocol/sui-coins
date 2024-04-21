import { values } from 'ramda';

import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL } from '@/constants/coins';
import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { Pool } from '@/interface';

export const getAllSymbols = (pools: ReadonlyArray<Pool>, network: Network) => [
  ...new Set(
    pools.flatMap((pool) =>
      (isClammPool(pool)
        ? pool.coinStates.map((coin) => coin.type)
        : values(pool.coinTypes)
      ).reduce((acc, type) => {
        if (!COIN_TYPE_TO_SYMBOL[network][type]) return acc;

        return [...acc, COIN_TYPE_TO_SYMBOL[network][type].toLowerCase()];
      }, [] as Array<string>)
    )
  ),
];
