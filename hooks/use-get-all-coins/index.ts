import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { makeSWRKey } from '@/utils';

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

      return (coinsRaw.map(({ coinType }) => coinType),
      {} as CoinsMap) as unknown as CoinsMap;
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
