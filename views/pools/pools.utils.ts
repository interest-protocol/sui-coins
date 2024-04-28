import { COINS_MAP } from '@/constants/coins';
import { AmmPool } from '@/interface';

export const getAllSymbols = (pools: ReadonlyArray<AmmPool>) => [
  ...new Set(
    pools.flatMap(
      (x) =>
        Object.values(x.coinTypes)
          .map((x) => {
            if (!COINS_MAP[x]) return null;

            const symbol = COINS_MAP[x].symbol.toLowerCase();

            return symbol === 'move' ? 'sui' : symbol;
          })
          .filter((x) => !!x) as string[]
    )
  ),
];
