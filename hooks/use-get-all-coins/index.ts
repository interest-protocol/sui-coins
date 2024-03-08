import { CoinMetadata } from '@mysten/sui.js/client';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { COINS_MAP } from '@/constants/coins';
import { useNetwork } from '@/context/network';
import { makeSWRKey, normalizeSuiType } from '@/utils';

import { useMovementClient } from '../use-movement-client';
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
  const { network } = useNetwork();
  const suiClient = useMovementClient();
  const { currentAccount } = useWalletKit();

  return useSWR(
    makeSWRKey([network, currentAccount?.address], suiClient.getAllCoins.name),
    async () => {
      if (!currentAccount) return null;
      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

      const coinsMetadata: ReadonlyArray<CoinMetadata | null> =
        await Promise.all(
          coinsRaw.map(({ coinType }) =>
            suiClient.getCoinMetadata({ coinType })
          )
        );

      return coinsRaw.reduce((acc, { coinType, ...coinRaw }, index) => {
        const type = normalizeSuiType(coinType);
        const { symbol, decimals, ...metadata } = {
          ...{
            name: '',
            symbol: '',
            decimals: 0,
            description: '',
          },
          ...coinsMetadata[index],
          ...COINS_MAP[coinType],
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
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
