import useSWR from 'swr';

const useTokenPriceBySymbol = (symbol: string) =>
  useSWR(symbol, () =>
    fetch(`/api/auth/v1/coin-price?symbol=${symbol}`)
      .then((response) => response.json())
      .then((data) => data[symbol][0].quote.USD.price)
  );

export default useTokenPriceBySymbol;
