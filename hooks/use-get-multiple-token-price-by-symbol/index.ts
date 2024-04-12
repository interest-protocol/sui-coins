import useSWR, { SWRConfiguration } from 'swr';

const useGetMultipleTokenPriceBySymbol = (
  symbols: ReadonlyArray<string>,
  config: SWRConfiguration = {}
) => {
  return useSWR(
    useGetMultipleTokenPriceBySymbol + symbols.toString(),
    () =>
      fetch(`/api/v1/coin-price?symbol=${symbols.toString()}`)
        .then((response) => response.json())
        .then((data) => {
          const prices = symbols.reduce(
            (acc, symbol) => {
              const obj = data[symbol.toUpperCase()];

              return {
                ...acc,
                ...(obj && {
                  [symbol === 'sui' ? 'mov' : symbol]: obj[0].quote.USD.price,
                }),
              };
            },
            {} as Record<string, number>
          );

          console.log({ prices, data });

          return prices;
        }),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshInterval: 0,
      ...config,
    }
  );
};

export default useGetMultipleTokenPriceBySymbol;
