import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { normalizeStructTag } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import useSWR from 'swr';

import { useCoins } from '@/hooks/use-coins';
import { CoinMetadataWithType } from '@/interface';
import { isSui, makeSWRKey, ZERO_BIG_NUMBER } from '@/utils';

import { CoinsMap, TGetAllCoins } from './web3-manager.types';

const getAllCoins: TGetAllCoins = async (provider, account, cursor = null) => {
  const { data, nextCursor, hasNextPage } = await provider.getAllCoins({
    owner: account,
    cursor,
  });

  if (!hasNextPage) return data;

  const newData = await getAllCoins(provider, account, nextCursor);

  return [...data, ...newData];
};

const CoinsManager: FC = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const { id, delay, updateCoins, updateLoading, updateError } = useCoins();

  useSWR(
    makeSWRKey(
      [id, network, currentAccount?.address],
      suiClient.getAllCoins.name
    ),
    async () => {
      try {
        updateError(false);
        updateLoading(true);
        if (!currentAccount) return {} as CoinsMap;

        const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

        if (!coinsRaw.length) return {} as CoinsMap;

        const coinsType = [
          ...new Set(coinsRaw.map(({ coinType }) => coinType)),
        ];

        const dbCoinsMetadata: Record<string, CoinMetadataWithType> =
          await fetch(
            encodeURI(
              `/api/auth/v1/coin-metadata?network=${network}&type_list=${coinsType.join(
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

        const coins = filteredCoinsRaw.reduce(
          (acc, { coinType, ...coinRaw }) => {
            const type = normalizeStructTag(coinType) as `0x${string}`;
            const { symbol, decimals, ...metadata } = dbCoinsMetadata[coinType];

            if (isSui(type))
              return {
                ...acc,
                [SUI_TYPE_ARG as `0x${string}`]: {
                  ...acc[SUI_TYPE_ARG as `0x${string}`],
                  ...coinRaw,
                  type: SUI_TYPE_ARG as `0x${string}`,
                  symbol,
                  decimals,
                  metadata,
                  balance: BigNumber(coinRaw.balance).plus(
                    acc[SUI_TYPE_ARG as `0x${string}`]?.balance ??
                      ZERO_BIG_NUMBER
                  ),
                  objects: (acc[SUI_TYPE_ARG as string]?.objects ?? []).concat([
                    { ...coinRaw, type: SUI_TYPE_ARG as `0x${string}` },
                  ]),
                },
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
                  objects: (acc[type]?.objects ?? []).concat([
                    { ...coinRaw, type },
                  ]),
                },
              };

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
                objects: (acc[type]?.objects ?? []).concat([
                  { ...coinRaw, type },
                ]),
              },
            };
          },
          {} as CoinsMap
        ) as unknown as CoinsMap;

        updateCoins(coins);
      } catch {
        updateError(true);
      } finally {
        updateLoading(false);
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: delay,
    }
  );

  return null;
};

export default CoinsManager;
