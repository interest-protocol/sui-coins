import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import SuiNetwork from '../account-info/sui-network';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const { currentAccount } = useWalletKit();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      flexDirection={['row-reverse', 'row-reverse', 'row-reverse', 'row']}
      alignItems="center"
    >
      <Box display="flex" gap="m">
        {!!currentAccount && (
          <>
            <Box
              gap="l"
              justifyContent="flex-end"
              display={['none', 'none', 'none', 'flex']}
            >
              <SuiNetwork />
            </Box>
            <Profile />
          </>
        )}
      </Box>
      {!currentAccount && (
        <Box display="flex">
          <ConnectWalletButton />
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
