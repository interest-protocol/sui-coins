import { normalizeStructTag } from '@mysten/sui/utils';
import useSWR from 'swr';

import { useNetwork } from '../use-network';
import { CMC_COIN_ID } from './../../constants/coins';

const useTokenPriceByType = (type: string) => {
  const network = useNetwork();

  return useSWR(type, async () =>
    fetch(
      CMC_COIN_ID[network][type]
        ? `/api/auth/v1/coin-price?id=${CMC_COIN_ID[network][type]}`
        : encodeURI(
            `https://aftermath.finance/api/price-info/["${normalizeStructTag(
              type
            )}"]`
          ),
      {
        next: { revalidate: 1800 },
        headers: { Accept: 'application/json' },
      }
    )
      .then((response) => response.json?.())
      .then((data) =>
        CMC_COIN_ID[network][type]
          ? data[CMC_COIN_ID[network][type]].quote.USD.price
          : data[normalizeStructTag(type)].price
      )
  );
};

export default useTokenPriceByType;
