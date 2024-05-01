import { useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { makeSWRKey } from '@/utils';

export const useSuiSystemState = () => {
  const client = useSuiClient();

  return useSWR(
    makeSWRKey([], client.getLatestSuiSystemState.name),
    async () => client.getLatestSuiSystemState(),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );
};
