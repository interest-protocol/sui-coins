import { useState } from 'react';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';
import { isSui, makeSWRKey } from '@/utils';

export const useGetCoinMetadata = (coinsType: ReadonlyArray<string>) => {
  const network = useNetwork();
  const [metadata, setMetadata] =
    useState<Record<string, CoinMetadataWithType>>();

  const { isLoading } = useSWR(
    makeSWRKey([], useGetCoinMetadata.name + coinsType + network),
    async () => {
      if (!coinsType.length) return {};

      const coinsToFetch = coinsType.filter((type) => !metadata?.[type]);

      await fetch(
        encodeURI(
          `/api/auth/v1/coin-metadata?network=${network}&type_list=${coinsToFetch.join(
            ','
          )}`
        )
      )
        .then((res) => res.json())
        .then((data: ReadonlyArray<CoinMetadataWithType>) =>
          setMetadata((oldData) => ({
            ...oldData,
            ...data.reduce(
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

  return { isLoading, data: metadata };
};
