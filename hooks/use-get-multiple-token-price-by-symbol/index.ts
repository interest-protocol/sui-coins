import useSWR, { SWRConfiguration } from 'swr';

const useGetMultipleTokenPriceBySymbol = (
  symbols: ReadonlyArray<string>,
  config: SWRConfiguration = {}
) => {
  return useSWR(
    useGetMultipleTokenPriceBySymbol + symbols.toString(),
    async () => {
      if (!symbols.length) return {} as Record<string, number>;

      const res = await fetch(`/api/v1/coin-price?symbol=${symbols}`);

      const data = await res.json();

      return symbols.reduce(
        (acc, symbol) => {
          const obj = data[symbol.toUpperCase()];
          return {
            ...acc,
            ...(obj && {
              [symbol === 'sui' ? 'move' : symbol]: obj[0].quote.USD.price,
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
