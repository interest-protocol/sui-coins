import { Network } from '@/constants';
import { COINS_MAP } from '@/constants/coins';

export const getAllSymbols = (
  types: ReadonlyArray<string>,
  network: Network
) => [
  ...new Set(
    types
      .map((x) => {
        if (!COINS_MAP[network][x]) return null;

        const symbol = COINS_MAP[network][x].symbol.toLowerCase();

        return symbol === 'move' ? 'sui' : symbol;
      })
      .filter((x) => !!x) as string[]
  ),
];
