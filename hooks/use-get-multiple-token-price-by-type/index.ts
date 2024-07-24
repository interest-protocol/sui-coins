import useSWR, { SWRConfiguration } from 'swr';

import { useNetwork } from '../use-network';
import { getAllCoinsPrice } from './use-get-multiple-token-price-by-type.utils';

const useGetMultipleTokenPriceByType = (
  types: ReadonlyArray<string>,
  config: SWRConfiguration = {}
) => {
  const network = useNetwork();

  return useSWR<Record<string, number>>(
    useGetMultipleTokenPriceByType.name + types.toString(),
    async () => getAllCoinsPrice(types, network),
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      ...config,
    }
  );
};

export default useGetMultipleTokenPriceByType;
