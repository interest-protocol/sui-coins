import { useCurrentAccount } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { AmmPool, AmmServerPool } from '@/interface';
import {
  convertServerPoolToClientPool,
  isLpCoinType,
  makeSWRKey,
} from '@/utils';

export const useGetPoolsByLpCoinTypes = () => {
  const network = useNetwork();
  const { coins } = useWeb3();
  const account = useCurrentAccount();

  const lpCoins = coins.filter((x) => isLpCoinType(x.type)).map((x) => x.type);

  return useSWR<readonly AmmPool[]>(
    makeSWRKey([network, account], useGetPoolsByLpCoinTypes.name),
    async () => {
      if (!account) return [];

      const res = await fetch(
        `/api/v1/get-pools-by-lpcoins?lpCoins=${lpCoins.toString()}&network=${network}`
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
