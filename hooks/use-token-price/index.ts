import { normalizeStructTag } from '@mysten/sui/utils';
import useSWR from 'swr';

import { getPrices } from '../use-get-multiple-token-price-by-type/use-get-multiple-token-price-by-type.utils';
import { useNetwork } from '../use-network';

const useTokenPriceByType = (type: string) => {
  const network = useNetwork();

  return useSWR(type, () =>
    getPrices([type], network).then(
      (data) => data[normalizeStructTag(type)].price
    )
  );
};

export default useTokenPriceByType;
