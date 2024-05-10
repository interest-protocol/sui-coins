import { useSuiClient, useSuiClientContext } from '@mysten/dapp-kit';
import { useState } from 'react';
import useSWR from 'swr';

import useEventListener from '@/hooks/use-event-listener';
import { makeSWRKey } from '@/utils';

const useCheckpoint = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const [isOnline, setIsOnline] = useState(false);

  useEventListener('offline', () => setIsOnline(false), true);
  useEventListener('online', () => setIsOnline(true), true);

  const { isLoading, data, error } = useSWR(
    makeSWRKey(
      [network, isOnline],
      suiClient.getLatestCheckpointSequenceNumber.name
    ),
    () => suiClient.getLatestCheckpointSequenceNumber(),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 15000,
    }
  );

  return {
    ok: !!data && isOnline,
    loading: isLoading && !error,
    content: isLoading ? 'Loading...' : data ?? 'System down!',
  };
};

export default useCheckpoint;
