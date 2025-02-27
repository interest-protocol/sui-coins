import { useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import {
  EXPLORER_STORAGE_KEY,
  INCINERATOR_EXTERNAL_LINK,
  LOCAL_STORAGE_VERSION,
  Routes,
  RoutesEnum,
} from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';

const IncineratorInitManager: FC = () => {
  const { loading } = useWeb3();
  const { replace, pathname } = useRouter();
  const { currentWallet } = useCurrentWallet();
  const [hasRedirected, setHasRedirected] = useLocalStorage<boolean>(
    `${LOCAL_STORAGE_VERSION}-${EXPLORER_STORAGE_KEY}`,
    false
  );

  useEffect(() => {
    if (currentWallet?.name === 'Sui Wallet' && !loading && !hasRedirected) {
      console.log('>> Redirecting to Sui Wallet safe website');
      setHasRedirected(true);
      replace(INCINERATOR_EXTERNAL_LINK);
    }
  }, [currentWallet, loading, hasRedirected, replace, setHasRedirected]);

  useEffect(() => {
    if (hasRedirected && pathname === '/incinerator') {
      replace(Routes[RoutesEnum.Swap]);
      setHasRedirected(false);
    }
  }, [hasRedirected, pathname, replace, setHasRedirected]);

  return null;
};

export default IncineratorInitManager;
