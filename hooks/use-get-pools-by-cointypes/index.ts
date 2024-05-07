import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { AmmPool, AmmServerPool } from '@/interface';
import { convertServerPoolToClientPool } from '@/utils';

export const useGetPoolsByCoinTypes = (
  coinInType: string,
  coinOutType: string
) => {
  const network = useNetwork();

  return useSWR<AmmPool[]>(
    `/api/auth/v1/get-pools-by-cointypes?coinInType=${coinInType}&coinOutType=${coinOutType}&network=${network}`,
    async () => {
      const res = await fetch(
        `/api/auth/v1/get-pools-by-cointypes?coinInType=${coinInType}&coinOutType=${coinOutType}&network=${network}`
      );

      const pools = (await res.json()) as AmmServerPool[];

      return pools.map((x) => convertServerPoolToClientPool(x));
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const useGetPoolsByLpCoinTypes = (lpCoins: readonly string[]) => {
  const network = useNetwork();

  return useSWR<AmmPool[]>(
    `/api/auth/v1/get-pools-by-lpcoins?lpCoins=${lpCoins.toString()}&network=${network}`,
    async () => {
      const res = await fetch(
        `/api/auth/v1/get-pools-by-lpcoins?lpCoins=${lpCoins.toString()}&network=${network}`
      );

      const pools = (await res.json()) as AmmServerPool[];

      return pools.map((x) => convertServerPoolToClientPool(x));
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
