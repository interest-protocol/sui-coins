import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { CoinMetadataWithType } from '@/interface';
import { makeSWRKey, normalizeSuiType, ZERO_BIG_NUMBER } from '@/utils';

import { CoinsMap, TGetAllCoins } from './use-get-all-coins.types';

const getAllCoins: TGetAllCoins = async (provider, account, cursor = null) => {
  const { data, nextCursor, hasNextPage } = await provider.getAllCoins({
    owner: account,
    cursor,
  });

  if (!hasNextPage) return data;

  const newData = await getAllCoins(provider, account, nextCursor);

  return [...data, ...newData];
};

export const useGetAllCoins = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return useSWR(
    makeSWRKey([network, currentAccount?.address], suiClient.getAllCoins.name),
    async () => {
      if (!currentAccount) return {} as CoinsMap;

      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

      if (!coinsRaw.length) return {} as CoinsMap;

      const coinsType = coinsRaw.map(({ coinType }) => coinType);

      const dbCoinsMetadata: Record<string, CoinMetadataWithType> = await fetch(
        encodeURI(
          `/api/v1/coin-metadata?network=${network}&type_list=${coinsType.join(
            ','
          )}`
        )
      )
        .then((res) => res.json())
        .then((data: ReadonlyArray<CoinMetadataWithType>) =>
          data.reduce((acc, item) => ({ ...acc, [item.type]: item }), {})
        );

      const filteredCoinsRaw = coinsRaw.filter(
        ({ coinType }) => dbCoinsMetadata[coinType]
      );

      if (!filteredCoinsRaw.length) return {} as CoinsMap;

      return filteredCoinsRaw.reduce((acc, { coinType, ...coinRaw }) => {
        const type = normalizeSuiType(coinType) as `0x${string}`;
        const { symbol, decimals, ...metadata } = dbCoinsMetadata[coinType];

        return {
          ...acc,
          [type]: {
            ...acc[type],
            ...coinRaw,
            type,
            symbol,
            decimals,
            metadata,
            balance: BigNumber(coinRaw.balance).plus(
              acc[type]?.balance ?? ZERO_BIG_NUMBER
            ),
            objects: (acc[type]?.objects ?? []).concat([{ ...coinRaw, type }]),
          },
        };
      }, {} as CoinsMap) as unknown as CoinsMap;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
