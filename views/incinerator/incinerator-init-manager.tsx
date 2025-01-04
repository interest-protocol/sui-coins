import { useCurrentWallet } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import { INCINERATOR_EXTERNAL_LINK } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';

const IncineratorInitManager: FC = () => {
  const { loading } = useWeb3();
  const { replace } = useRouter();
  const { currentWallet } = useCurrentWallet();

  useEffect(() => {
    console.log('>> Wallet name: ', currentWallet?.name);
    if (currentWallet?.name === 'Sui Wallet') {
      console.log('>> Redirecting to Sui Wallet safe website');
      replace(INCINERATOR_EXTERNAL_LINK);
    }
  }, [currentWallet, loading]);

  return null;
};

export default IncineratorInitManager;
