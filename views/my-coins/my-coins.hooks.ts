import { CoinMetadata } from '@mysten/sui.js/client';
import { useWalletKit } from '@mysten/wallet-kit';
import { values } from 'ramda';
import { useEffect, useState } from 'react';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';

import {
  ICoinResponse,
  TCoinWithMetadata,
  TGetAllCoins,
  TGetOwned,
  TUseGetAllCoinsWithMetadata,
} from './my-coins.types';

const getOwned: TGetOwned = async (provider, account, cursor = null) => {
  const { data, nextCursor, hasNextPage } = await provider.getOwnedObjects({
    owner: account,
    cursor,
    options: {
      showType: true,
    },
  });

  if (!hasNextPage)
    return data
      .filter(
        ({ error, data }) =>
          !error && data?.type!.startsWith('0x2::coin::TreasuryCap')
      )
      .map(({ data }) => ({
        type: data!.type!.split('0x2::coin::TreasuryCap<')[1].slice(0, -1),
        objectId: data!.objectId,
      }));

  const newData = await getOwned(provider, account, nextCursor);

  return [
    ...data
      .filter(
        ({ error, data }) =>
          !error && data?.type!.startsWith('0x2::coin::TreasuryCap')
      )
      .map(({ data }) => ({
        type: data!.type!.split('0x2::coin::TreasuryCap<')[1].slice(0, -1),
        objectId: data!.objectId,
      })),
    ...newData,
  ];
};

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
  const { network } = useNetwork();
  const suiClient = useSuiClient(network);
  const { currentAccount } = useWalletKit();
  const [error, setError] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ReadonlyArray<TCoinWithMetadata>>([]);

  useEffect(() => {
    if (currentAccount) {
      (async () => {
        try {
          const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

          const ownedTypes = await getOwned(suiClient, currentAccount.address);

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
                owned:
                  ownedTypes.find(({ type }) => type === coinRaw.coinType)
                    ?.objectId ||
                  acc[coinRaw.coinType]?.owned ||
                  null,
                objects: (acc[coinRaw.coinType]?.objects ?? []).concat(coinRaw),
              },
            }),
            {} as Record<string, ICoinResponse>
          );

          const coinsMetadata: ReadonlyArray<CoinMetadata | null> =
            await Promise.all(
              values(coinsRawMap).map(({ coinType }) =>
                suiClient.getCoinMetadata({ coinType })
              )
            );

          setData(
            values(coinsRawMap).map((coin, index) => ({
              ...coin,
              ...(coinsMetadata[index] as CoinMetadata),
            }))
          );
        } catch (e) {
          setError(e);
        } finally {
          setLoading(false);
        }
      })();
      return;
    }

    setLoading(false);
  }, [currentAccount, suiClient]);

  return {
    error,
    isLoading,
    coins: (data ?? []) as ReadonlyArray<TCoinWithMetadata>,
  };
};
