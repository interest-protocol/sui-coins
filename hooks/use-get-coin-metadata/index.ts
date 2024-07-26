import { useState } from 'react';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata, isSui, makeSWRKey } from '@/utils';

export const useGetCoinMetadata = (coinsType: ReadonlyArray<string>) => {
  const network = useNetwork();
  const [metadata, setMetadata] =
    useState<Record<string, CoinMetadataWithType>>();

  const swr = useSWR(
    makeSWRKey([], useGetCoinMetadata.name + coinsType + network),
    async () => {
      if (!coinsType.length) return {};

      const coinsToFetch = coinsType.filter((type) => !metadata?.[type]);

      await fetchCoinMetadata({ types: coinsToFetch, network }).then(
        (data: ReadonlyArray<CoinMetadataWithType>) =>
          setMetadata((oldData) => ({
            ...oldData,
            ...data?.reduce(
              (acc, { symbol, ...item }) => ({
                ...acc,
                [item.type]: {
                  ...item,
                  symbol: isSui(item.type) ? 'MOVE' : symbol,
                },
              }),
              {}
            ),
          }))
      );
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );

  return { ...swr, data: metadata };
};
