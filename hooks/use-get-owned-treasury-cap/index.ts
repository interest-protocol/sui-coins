import { useWalletKit } from '@mysten/wallet-kit';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { useSuiClient } from '@/hooks/use-sui-client';
import { makeSWRKey } from '@/utils';

import { TGetOwned } from './use-get-owned-treasury-cap.types';

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

export const useGetOwnedTreasuryCap = () => {
  const suiClient = useSuiClient();
  const { network } = useNetwork();
  const { currentAccount } = useWalletKit();
  return useSWR(
    makeSWRKey([network, currentAccount?.address], 'useGetOwnedTreasuryCap '),
    async () => {
      if (!currentAccount) return null;
      return getOwned(suiClient, currentAccount.address);
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
