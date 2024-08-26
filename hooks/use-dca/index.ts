import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { DCA, DCAOrder, Paginated } from './use-dca.types';

export const useDcas = () => {
  const currentAccount = useCurrentAccount();

  return useSWR<[Paginated<DCA>, Paginated<DCA>] | null>(
    `dcas-${currentAccount?.address}`,
    () => {
      if (!currentAccount) return null;

      console.log({ address: currentAccount.address });

      return Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas?active=true&pageSize=100&owner=${currentAccount.address}`
        ).then((response) => response.json?.()),
        fetch(
          `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas?active=false&pageSize=100&owner=${currentAccount.address}`
        ).then((response) => response.json?.()),
      ]);
    },
    {
      refreshInterval: 30_000,
    }
  );
};

export const useDcaOrders = (id: string, active: boolean) =>
  useSWR<Paginated<DCAOrder> | null>(
    `dca-orders-${id}`,
    () => {
      if (!id) return null;

      console.log({ id });

      return fetch(
        `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas/${id}/orders?pageSize=100`
      ).then((response) => response.json?.());
    },
    {
      refreshWhenHidden: true,
      refreshWhenOffline: false,
      refreshInterval: active ? 30_000 : undefined,
    }
  );
