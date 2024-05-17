import useSWR from 'swr';

import { METADATA } from '@/constants/metadata';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { makeSWRKey } from '@/utils';

export const useGetCoinMetadata = (coinsType: ReadonlyArray<string>) => {
  const network = useNetwork();

  return useSWR<Record<string, CoinMetadataWithType>>(
    makeSWRKey([], useGetCoinMetadata.name + coinsType + network),
    async () => {
      if (!coinsType.length) return {};

      return fetch(
        encodeURI(
          `/api/auth/v1/coin-metadata?network=${network}&type_list=${coinsType.join(
            ','
          )}`
        )
      )
        .then((res) => res.json())
        .then((data: ReadonlyArray<CoinMetadataWithType>) =>
          data
            .concat(METADATA[network])
            .reduce((acc, item) => ({ ...acc, [item.type]: item }), {})
        );
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
