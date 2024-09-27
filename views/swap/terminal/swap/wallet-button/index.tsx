import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import ConnectWallet from './connect-wallet';
import Profile from './profile';

const WalletButton: FC = () => {
  const currentAccount = useCurrentAccount();

  if (currentAccount) return <Profile />;

  return <ConnectWallet />;
};

export default WalletButton;
