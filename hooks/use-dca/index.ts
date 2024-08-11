import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

export const useDcas = () => {
  const currentAccount = useCurrentAccount();

  return useSWR(`dcas-${currentAccount?.address}`, () => {
    if (!currentAccount) return;

    return fetch(
      `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}/dcas?owner=${currentAccount.address}`
    ).then((response) => response.json?.());
  });
};

export const useDcaOrders = (id: string) =>
  useSWR(`dca-orders-${id}`, () => {
    if (!id) return;

    return fetch(
      `${process.env.NEXT_PUBLIC_SENTINEL_API_URL}/dcas/${id}/orders`
    ).then((response) => response.json?.());
  });
