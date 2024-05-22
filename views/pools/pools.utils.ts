import { COINS_MAP } from '@/constants/coins';

export const getAllSymbols = (types: ReadonlyArray<string>) => [
  ...new Set(
    types
      .map((x) => {
        if (!COINS_MAP[x]) return null;

        const symbol = COINS_MAP[x].symbol.toLowerCase();

        return symbol === 'move' ? 'sui' : symbol;
      })
      .filter((x) => !!x) as string[]
  ),
];
