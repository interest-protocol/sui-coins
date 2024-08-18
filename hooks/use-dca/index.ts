import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { DCA, DCAOrder, Paginated } from './use-dca.types';

export const useDcas = () => {
  const currentAccount = useCurrentAccount();

  return useSWR<[Paginated<DCA>, Paginated<DCA>] | null>(
    `dcas-${currentAccount?.address}`,
    () => {
      if (!currentAccount) return null;

      return Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas?active=true&pageSize=100&owner=${currentAccount.address}`
        ).then((response) => response.json?.()),
        fetch(
          `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas?active=false&pageSize=100&owner=${currentAccount.address}`
        ).then((response) => response.json?.()),
      ]);
    }
  );
};

export const useDcaOrders = (id: string) =>
  useSWR<Paginated<DCAOrder> | null>(`dca-orders-${id}`, () => {
    if (!id) return null;

    return fetch(
      `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas/${id}/orders?pageSize=100`
    ).then((response) => response.json?.());
  });
