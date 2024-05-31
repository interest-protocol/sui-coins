import { Box, Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import MovementNetwork from '../account-info/movement-network';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const currentAccount = useCurrentAccount();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      flexDirection={['row-reverse', 'row-reverse', 'row-reverse', 'row']}
    >
      <Box display="flex" gap="m">
        {!!currentAccount && (
          <>
            <a
              href="https://forms.gle/yj8UYiasf6ocNLDG6"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                bg="#FFDA34"
                color="#000000"
                variant="filled"
                p={['xs', 'xs', 's']}
                nHover={{ bg: 'warning' }}
              >
                Feedback
              </Button>
            </a>
            <Box
              gap="l"
              justifyContent="flex-end"
              display={['none', 'none', 'none', 'flex']}
            >
              <MovementNetwork />
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
