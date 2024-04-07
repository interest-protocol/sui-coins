import { COINS_MAP } from '@/constants/coins';
import { AmmPool } from '@/interface';

export const getAllSymbols = (pools: AmmPool[]) => [
  ...new Set(
    pools.flatMap(
      (x) =>
        Object.values(x.coinTypes)
          .map((x) => (COINS_MAP[x] ? COINS_MAP[x].symbol.toLowerCase() : null))
          .filter((x) => !!x) as string[]
    )
  ),
];
