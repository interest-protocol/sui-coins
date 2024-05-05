import { PoolMetadata } from '@interest-protocol/clamm-sdk';

import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL } from '@/constants/coins';

export const getAllSymbols = (
  pools: ReadonlyArray<PoolMetadata>,
  network: Network
) => [
  ...new Set(
    pools
      .flatMap((pool) => pool.coinTypes)
      .reduce((acc, type) => {
        if (!COIN_TYPE_TO_SYMBOL[network][type]) return acc;

        return [...acc, COIN_TYPE_TO_SYMBOL[network][type].toLowerCase()];
      }, [] as Array<string>)
  ),
];
