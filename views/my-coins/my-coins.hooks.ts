import { values } from 'ramda';
import useSWR from 'swr';

import { useProvider, useWeb3 } from '@/hooks';

import {
  ICoinMetadata,
  ICoinResponse,
  TCoinWithMetadata,
  TGetAllCoins,
  TUseGetAllCoinsWithMetadata,
} from './my-coins.types';

const getAllCoins: TGetAllCoins = async (provider, account, cursor = null) => {
  const { data, nextCursor, hasNextPage } = await provider.getAllCoins({
    owner: account,
    cursor,
  });

  if (!hasNextPage) return data;

  const newData = await getAllCoins(provider, account, nextCursor);

  return [...data, ...newData];
};

export const useGetAllCoinsWithMetadata: TUseGetAllCoinsWithMetadata = () => {
  const { account } = useWeb3();
  const provider = useProvider();

  const { data, isLoading, error } = useSWR(
    `${account}-${getAllCoins.name}`,
    async () => {
      if (!account) return;

      const coinsRaw = await getAllCoins(provider, account);

      const coinsRawMap = coinsRaw.reduce(
        (acc, coinRaw) => ({
          ...acc,
          [coinRaw.coinType]: {
            ...acc[coinRaw.coinType],
            ...coinRaw,
            balance: String(
              Number(coinRaw.balance) +
                Number(acc[coinRaw.coinType]?.balance || '0')
            ),
            objects: (acc[coinRaw.coinType]?.objects ?? []).concat(coinRaw),
          },
        }),
        {} as Record<string, ICoinResponse>
      );

      const coinsMetadata: ReadonlyArray<ICoinMetadata | null> =
        await Promise.all(
          values(coinsRawMap).map(({ coinType }) =>
            provider.getCoinMetadata({ coinType })
          )
        );

      return values(coinsRawMap).map((coin, index) => ({
        ...coin,
        ...coinsMetadata[index],
      }));
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  return {
    coins: (data ?? []) as ReadonlyArray<TCoinWithMetadata>,
    isLoading,
    error,
  };
};
