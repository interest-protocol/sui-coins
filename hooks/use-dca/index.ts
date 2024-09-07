import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { SENTINEL_API_URI } from '@/constants/dca';

import { useNetwork } from '../use-network';
import { DCA, DCAOrder, Paginated } from './use-dca.types';

export const useRecentDcas = () => {
  const network = useNetwork();
  const currentAccount = useCurrentAccount();

  return useSWR<ReadonlyArray<DCA> | null>(
    `recent-dcas-${currentAccount?.address}`,
    () => {
      if (!currentAccount) return null;

      return fetch(
        `${SENTINEL_API_URI[network]}dcas?active=true&pageSize=5&owner=${currentAccount.address}`
      )
        .then((response) => response.json?.())
        .then((data) => data.data);
    },
    {
      refreshInterval: 10_000,
    }
  );
};

export const useDcas = () => {
  const network = useNetwork();
  const currentAccount = useCurrentAccount();

  return useSWR<[Paginated<DCA>, Paginated<DCA>] | null>(
    `dcas-${currentAccount?.address}`,
    () => {
      if (!currentAccount) return null;

      return Promise.all([
        fetch(
          `${SENTINEL_API_URI[network]}dcas?active=true&pageSize=100&owner=0x40061c709edb896ad029c500de2aee3ef58a062a4b3bd05235d5ae3df6586d8b`
        ).then((response) => response.json?.()),
        fetch(
          `${SENTINEL_API_URI[network]}dcas?active=false&pageSize=100&owner=0x40061c709edb896ad029c500de2aee3ef58a062a4b3bd05235d5ae3df6586d8b`
        ).then((response) => response.json?.()),
      ]);
    },
    {
      refreshInterval: 30_000,
    }
  );
};

export const useDcaOrders = (id: string, active: boolean) => {
  const network = useNetwork();

  return useSWR<Paginated<DCAOrder> | null>(
    `dca-orders-${id}`,
    () => {
      if (!id) return null;

      return fetch(
        `${SENTINEL_API_URI[network]}dcas/${id}/orders?pageSize=100`
      ).then((response) => response.json?.());
    },
    {
      refreshWhenHidden: true,
      refreshWhenOffline: false,
      refreshInterval: active ? 30_000 : undefined,
    }
  );
};

export const useFeeFreeTokens = () => {
  const network = useNetwork();

  return useSWR<ReadonlyArray<string>>(
    `fee-free-tokens`,
    () =>
      fetch(`${SENTINEL_API_URI[network]}dcas/fee-free-list`).then(
        (response) => response.json?.()
      ),
    {
      refreshWhenHidden: true,
      refreshWhenOffline: false,
    }
  );
};
