import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { pathOr } from 'ramda';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { COIN_METADATA } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { CoinMetadataWithType, LocalTokenMetadataRecord } from '@/interface';
import { makeSWRKey, normalizeSuiType, safeSymbol, sleep } from '@/utils';

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

  const tokensMetadataRecord = useReadLocalStorage<LocalTokenMetadataRecord>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-tokens-metadata`
  );

  return useSWR(
    makeSWRKey([network, currentAccount?.address], suiClient.getAllCoins.name),
    async () => {
      if (!currentAccount) return {} as CoinsMap;
      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

      const coinsMetadata: Array<CoinMetadataWithType> = await fetch(
        `/api/v1/coin-metadata`
      ).then((res) => res.json());

      const coinTypesArray = coinsRaw
        .map(({ coinType }) => coinType)
        .filter(
          (type) => !coinsMetadata.some((metadata) => type === metadata.type)
        );

      for await (const coinType of coinTypesArray) {
        await sleep(350);

        const coinMetadata: CoinMetadataWithType | null = await suiClient
          .getCoinMetadata({ coinType })
          .then((data) => {
            if (!data) return null;

            const coinData = {
              ...data,
              type: coinType,
            };

            fetch(`/api/v1/coin-metadata`, {
              method: 'POST',
              body: JSON.stringify(coinData),
            });

            return coinData;
          });

        if (coinMetadata) coinsMetadata.push(coinMetadata);
      }

      const coinsMetadataMap: Record<string, CoinMetadataWithType> =
        coinsMetadata.reduce(
          (acc, curr) => ({ ...acc, [curr.type]: curr }),
          {}
        );

      return coinsRaw.reduce((acc, { coinType, ...coinRaw }) => {
        const type = normalizeSuiType(coinType);
        const { symbol, decimals, ...metadata } = coinsMetadataMap[
          coinType
        ] ?? {
          symbol:
            pathOr(null, ['symbol'], coinsMetadataMap[coinType]) ??
            pathOr(null, [type, 'symbol'], COIN_METADATA) ??
            pathOr(null, [type, 'symbol'], tokensMetadataRecord) ??
            safeSymbol(type, type).trim().split(' ').reverse()[0],
          decimals:
            pathOr(null, ['decimals'], coinsMetadataMap[coinType]) ??
            pathOr(null, [type, 'decimals'], COIN_METADATA) ??
            pathOr(-1, [type, 'decimals'], tokensMetadataRecord),
          name: '',
          description: '',
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
