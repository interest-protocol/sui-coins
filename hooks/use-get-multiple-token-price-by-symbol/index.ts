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
        .then((data) =>
          symbols.reduce(
            (acc, symbol) => {
              const obj = data[symbol.toUpperCase()];
              return obj ? acc : { ...acc, [symbol]: obj[0].quote.USD.price };
            },
            {} as Record<string, number>
          )
        ),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshInterval: 0,
      ...config,
    }
  );
};

export default useGetMultipleTokenPriceBySymbol;
