import useSWR from 'swr';

import { makeSWRKey } from '@/utils';

import { useMovementClient } from '../use-movement-client';

export const useSuiSystemState = () => {
  const client = useMovementClient();
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
