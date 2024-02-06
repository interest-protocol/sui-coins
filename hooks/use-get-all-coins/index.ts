import { formatAddress } from '@mysten/sui.js/utils';
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
import {
  chunk,
  getSymbolByType,
  makeSWRKey,
  normalizeSuiType,
  safeSymbol,
} from '@/utils';

import { CoinsMap, TGetAllCoins } from './use-get-all-coins.types';

export const getBasicCoinMetadata = (type: string) => ({
  decimals: 0,
  iconUrl: null,
  description: '',
  name: formatAddress(type),
  symbol: getSymbolByType(type),
});

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
      if (!currentAccount) return null;
      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

      const coinsType = coinsRaw.map(({ coinType }) => coinType);

      const dbCoinsMetadata: Record<string, CoinMetadataWithType> = await fetch(
        `/api/v1/coin-metadata?type_list=${coinsType.join(',')}`
      )
        .then((res) => res.json())
        .then((data: ReadonlyArray<CoinMetadataWithType>) =>
          data.reduce((acc, item) => ({ ...acc, [item.type]: item }), {})
        );

      const missingCoinsType = Array.from(
        new Set(coinsType.filter((type) => !dbCoinsMetadata[type]))
      );

      const missingCoinsTypeBatches = chunk<string>(missingCoinsType, 5);

      const missingCoinsMetadata = [] as Array<CoinMetadataWithType>;

      for await (const batch of missingCoinsTypeBatches) {
        const data = await Promise.all(
          batch.map((coinType) =>
            suiClient.getCoinMetadata({ coinType }).then((metadata) => ({
              ...(metadata ?? getBasicCoinMetadata(coinType)),
              type: coinType,
            }))
          )
        );

        data.map((item) => missingCoinsMetadata.push(item));
      }

      if (missingCoinsMetadata.length) {
        fetch(`/api/v1/coin-metadata`, {
          method: 'POST',
          body: JSON.stringify(missingCoinsMetadata),
        });
      }

      return coinsRaw.reduce((acc, { coinType, ...coinRaw }) => {
        const type = normalizeSuiType(coinType);
        const { symbol, decimals, ...metadata } = dbCoinsMetadata[coinType] ?? {
          symbol:
            pathOr(null, ['symbol'], dbCoinsMetadata[coinType]) ??
            pathOr(null, [type, 'symbol'], COIN_METADATA) ??
            pathOr(null, [type, 'symbol'], tokensMetadataRecord) ??
            safeSymbol(type, type).trim().split(' ').reverse()[0],
          decimals:
            pathOr(null, ['decimals'], dbCoinsMetadata[coinType]) ??
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
