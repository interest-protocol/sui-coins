import { Box } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import SuiNetwork from '../account-info/sui-network';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const currentAccount = useCurrentAccount();

  return (
    <Box
      gap="m"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection={['row-reverse', 'row-reverse', 'row-reverse', 'row']}
    >
      <Box display={['none', 'none', 'none', 'flex']}>
        <SuiNetwork />
      </Box>
      {currentAccount ? <Profile /> : <ConnectWalletButton />}
    </Box>
  );
};

export default Wallet;
