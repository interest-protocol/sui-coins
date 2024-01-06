import { CoinMetadata } from '@mysten/sui.js/client';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { makeSWRKey, sleep } from '@/utils';
import { RATE_LIMIT_DELAY } from '@/views/airdrop/airdrop.constants';

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
      if (!currentAccount) return null;
      const coinsRaw = await getAllCoins(suiClient, currentAccount.address);

      const coinTypesArray = coinsRaw.map(({ coinType }) => coinType);

      const coinsMetadata: Array<CoinMetadata | null> = [];

      for await (const coinType of coinTypesArray) {
        await sleep(350);
        coinsMetadata.push(await suiClient.getCoinMetadata({ coinType }));
      }

      return coinsRaw.reduce(
        (acc, coinRaw, i) => ({
          ...acc,
          [coinRaw.coinType]: {
            ...acc[coinRaw.coinType],
            ...coinRaw,
            balance: BigNumber(coinRaw.balance)
              .plus(BigNumber(acc[coinRaw.coinType]?.balance || '0'))
              .toString(),
            objects: (acc[coinRaw.coinType]?.objects ?? []).concat(coinRaw),
            metadata: coinsMetadata[i]
              ? (coinsMetadata[i] as CoinMetadata)
              : {
                  decimals: 0,
                  name: '',
                  description: '',
                  symbol: '',
                },
          },
        }),
        {} as CoinsMap
      );
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
