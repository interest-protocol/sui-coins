import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { makeSWRKey } from '@/utils';

interface UseGetCoinHoldersArgs {
  coinType: string;
  pageIndex: string;
  pageSize: string;
}

export const useGetCoinHolders = (data: UseGetCoinHoldersArgs) => {
  const network = useNetwork();

  return useSWR(
    makeSWRKey(
      [network, data.coinType, data.pageIndex, data.pageSize],
      useGetCoinHolders.name
    ),
    async () => {
      const res = await fetch(
        `api/v1/coin-holders?coinType=${data.coinType}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`
      );

      return res.json();
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );
};
