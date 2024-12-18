import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { CoinBalance } from '@mysten/sui/dist/cjs/client';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { isEmpty } from 'ramda';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import { Network } from '@/constants';
import { METADATA } from '@/constants/metadata';
import { useCoins } from '@/hooks/use-coins';
import { useNetwork } from '@/hooks/use-network';
import { CoinMetadataWithType } from '@/interface';
import { fetchCoinMetadata, isSui, makeSWRKey } from '@/utils';

import { CoinsMap } from './coins-manager.types';

const CoinsManager: FC = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { id, delay, coinsMap, updateCoins, updateLoading, updateError } =
    useCoins();

  /*useEffect(() => {
    updateCoins({} as CoinsMap);
  }, [currentAccount]);*/

  useSWR(
    makeSWRKey([id, network, currentAccount?.address], CoinsManager.name),
    async () => {
      try {
        updateError(false);
        if (!currentAccount?.address) return updateCoins({} as CoinsMap);

        if (isEmpty(coinsMap)) updateLoading(true);

        const allCoinsRaw = await suiClient.getAllBalances({
          owner: currentAccount.address,
        });

        const coinsRaw = allCoinsRaw.reduce(
          (acc, coin) =>
            Number(coin.totalBalance)
              ? isSui(coin.coinType)
                ? [coin, ...acc]
                : [...acc, coin]
              : acc,
          [] as ReadonlyArray<CoinBalance>
        );

        if (!coinsRaw.length) return updateCoins({} as CoinsMap);

        const coinsType = [
          ...new Set(coinsRaw.map(({ coinType }) => coinType)),
        ];

        const dbCoinsMetadata: Record<string, CoinMetadataWithType> =
          await fetchCoinMetadata({ network, types: coinsType }).then((data) =>
            data.reduce((acc, item) => {
              const override =
                METADATA[network as Network][normalizeStructTag(item.type)] ||
                item;
              return {
                ...acc,
                [normalizeStructTag(override.type)]: {
                  ...override,
                  type: normalizeStructTag(override.type),
                },
              };
            }, {})
          );

        const filteredCoinsRaw = coinsRaw.filter(
          ({ coinType }) => dbCoinsMetadata[normalizeStructTag(coinType)]
        );

        if (!filteredCoinsRaw.length) return updateCoins({} as CoinsMap);

        const coins = filteredCoinsRaw.reduce(
          (acc, { coinType, totalBalance, coinObjectCount }) => {
            const type = normalizeStructTag(coinType) as `0x${string}`;
            const { symbol, decimals, ...metadata } = dbCoinsMetadata[type];

            if (isSui(type))
              return {
                ...acc,
                [SUI_TYPE_ARG as `0x${string}`]: {
                  ...acc[SUI_TYPE_ARG as `0x${string}`],
                  type: SUI_TYPE_ARG as `0x${string}`,
                  symbol,
                  decimals,
                  metadata,
                  balance: BigNumber(totalBalance),
                  objectsCount: coinObjectCount,
                },
              };

            return {
              ...acc,
              [type]: {
                ...acc[type],
                type,
                symbol,
                decimals,
                metadata,
                objectsCount: coinObjectCount,
                balance: BigNumber(totalBalance),
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
