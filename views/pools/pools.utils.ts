import { PoolMetadata } from '@interest-protocol/clamm-sdk';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';

import { Network } from '@/constants';
import { COIN_TYPE_TO_SYMBOL } from '@/constants/coins';
import { TOKEN_SYMBOL } from '@/lib';

export const getAllSymbols = (
  pools: ReadonlyArray<PoolMetadata>,
  network: Network
) => [
  ...new Set(
    pools
      .flatMap((pool) => pool.coinTypes)
      .reduce((acc, type) => {
        if (normalizeStructTag(type) === normalizeStructTag(SUI_TYPE_ARG))
          return [...acc, TOKEN_SYMBOL.SUI.toLowerCase()];
        if (!COIN_TYPE_TO_SYMBOL[network][type]) return acc;

        return [...acc, COIN_TYPE_TO_SYMBOL[network][type].toLowerCase()];
      }, [] as Array<string>)
  ),
];
