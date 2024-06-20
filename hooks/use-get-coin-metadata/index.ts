import { normalizeStructTag } from '@mysten/sui/utils';
import useSWR from 'swr';

import { METADATA } from '@/constants/metadata';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata, makeSWRKey } from '@/utils';

export const useGetCoinMetadata = (coinsType: ReadonlyArray<string>) => {
  const network = useNetwork();

  return useSWR<Record<string, CoinMetadataWithType>>(
    makeSWRKey([], useGetCoinMetadata.name + coinsType + network),
    async () => {
      if (!coinsType.length) return {};

      return fetchCoinMetadata({ network, types: coinsType }).then((data) =>
        data
          .map((metadata) => {
            const override =
              METADATA[network][normalizeStructTag(metadata.type)];

            return override || metadata;
          })
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
