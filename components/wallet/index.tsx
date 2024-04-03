import { Box } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import SuiNetwork from '../account-info/sui-network';
import Mint from '../mint';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const { isConnecting } = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  return (
    <Box
      gap="m"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection={['row-reverse', 'row-reverse', 'row-reverse', 'row']}
    >
      <Box display={['none', 'none', 'none', 'flex']} gap="s">
        <Mint />
        <SuiNetwork />
      </Box>
      {isConnecting ? (
        <Box
          width="2.2rem"
          height="2.2rem"
          overflow="hidden"
          borderRadius="50%"
        >
          <Skeleton height="2.2rem" width="10rem" />
        </Box>
      ) : currentAccount ? (
        <Profile />
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default Wallet;
