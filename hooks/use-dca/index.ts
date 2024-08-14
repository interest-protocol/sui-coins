import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { DCAOrder } from './use-dca.types';

export const useDcas = () => {
  const currentAccount = useCurrentAccount();

  return useSWR(`dcas-${currentAccount?.address}`, () => {
    if (!currentAccount) return;

    return fetch(
      `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas?owner=${currentAccount.address}`
    ).then((response) => response.json?.());
  });
};

export const useDcaOrders = (id: string) =>
  useSWR<{
    page: number;
    pageSize: number;
    totalItems: number;
    data: ReadonlyArray<DCAOrder>;
  } | null>(`dca-orders-${id}`, () => {
    if (!id) return null;

    return fetch(
      `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}dcas/${id}/orders?pageSize=100`
    ).then((response) => response.json?.());
  });
