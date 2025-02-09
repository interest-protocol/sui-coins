import { useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { INCINERATOR_EXTERNAL_LINK } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';

const IncineratorInitManager: FC = () => {
  const { loading } = useWeb3();
  const { replace, pathname } = useRouter();
  const { currentWallet } = useCurrentWallet();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (currentWallet?.name === 'Sui Wallet' && !hasRedirected) {
      console.log('>> Redirecting to Sui Wallet safe website');
      setHasRedirected(true);
      replace(INCINERATOR_EXTERNAL_LINK);
    } else if (hasRedirected && pathname === '/incinerator') {
      replace('/');
    }
  }, [currentWallet, loading, hasRedirected, pathname, replace]);

  return null;
};

export default IncineratorInitManager;
