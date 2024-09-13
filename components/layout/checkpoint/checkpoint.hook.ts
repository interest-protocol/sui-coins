import { useSuiClient } from '@mysten/dapp-kit';
import { useState } from 'react';
import useSWR from 'swr';

import useEventListener from '@/hooks/use-event-listener';
import { useNetwork } from '@/hooks/use-network';
import { makeSWRKey } from '@/utils';

const useCheckpoint = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const [isOnline, setIsOnline] = useState(false);

  useEventListener('online', () => setIsOnline(true), true);
  useEventListener('offline', () => setIsOnline(false), true);

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
