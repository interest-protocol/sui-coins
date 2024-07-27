import { pathOr } from 'ramda';
import useSWR, { SWRConfiguration } from 'swr';

import { PRICE_BLACKLIST } from '@/constants';

const useGetMultipleTokenPriceBySymbol = (
  symbols: ReadonlyArray<string>,
  config: SWRConfiguration = {}
) => {
  return useSWR(
    useGetMultipleTokenPriceBySymbol + symbols.toString(),
    async () => {
      if (!symbols.length) return {} as Record<string, number>;

      const validSymbols = symbols.filter(
        (symbol) => !PRICE_BLACKLIST.includes(symbol)
      );

      const res = await fetch(`/api/v1/coin-price?symbol=${validSymbols}`);

      const data = await res.json();

      return validSymbols.reduce(
        (acc, symbol) => {
          const obj = data[symbol.toUpperCase()];

          const price =
            Array.isArray(obj) && !!obj.length
              ? pathOr(0, ['quote', 'USD', 'price'], obj[0])
              : 0;

          return {
            ...acc,
            ...(obj && {
              [symbol === 'sui' ? 'move' : symbol]: price,
            }),
          };
        },
        {} as Record<string, number>
      );
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      ...config,
    }
  );
};

export default useGetMultipleTokenPriceBySymbol;
