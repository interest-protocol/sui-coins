import useSWR from 'swr';

import { PRICE_BLACKLIST } from '@/constants';

const useTokenPriceBySymbol = (symbol: string) =>
  useSWR(symbol, () => {
    if (!PRICE_BLACKLIST.includes(symbol))
      return fetch(`/api/v1/coin-price?symbol=${symbol}`)
        .then((response) => response.json())
        .then((data) => data[symbol][0].quote.USD.price);

    return null;
  });

export default useTokenPriceBySymbol;
