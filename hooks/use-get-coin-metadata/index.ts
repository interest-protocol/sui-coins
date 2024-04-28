import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';
import { isSui, makeSWRKey } from '@/utils';

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
          data.reduce(
            (acc, { symbol, ...item }) => ({
              ...acc,
              [item.type]: {
                ...item,
                symbol: isSui(item.type) ? 'MOVE' : symbol,
              },
            }),
            {}
          )
        );
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
