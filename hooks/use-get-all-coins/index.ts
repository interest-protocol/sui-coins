import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { CoinMetadataWithType } from '@/interface';
import { makeSWRKey, normalizeSuiType } from '@/utils';

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
  const suiClient = useSuiClient();
  const { network } = useNetwork();
  const { currentAccount } = useWalletKit();

  return useSWR(
    makeSWRKey([network, currentAccount?.address], suiClient.getAllCoins.name),
    async () => {
      if (!currentAccount) return {} as CoinsMap;
      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

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

      return coinsRaw.reduce((acc, { coinType, ...coinRaw }) => {
        const type = normalizeSuiType(coinType);
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
            balance: BigNumber(coinRaw.balance)
              .plus(BigNumber(acc[type]?.balance || '0'))
              .toString(),
            objects: (acc[type]?.objects ?? []).concat([{ ...coinRaw, type }]),
          },
        };
      }, {} as CoinsMap);
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );
};
