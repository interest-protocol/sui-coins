import { Box, Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC } from 'react';

import MovementNetwork from '../account-info/movement-network';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const currentAccount = useCurrentAccount();

  return (
    <Box gap="s" display="flex" alignItems="center" justifyContent="flex-end">
      <a
        href="https://exultant-lycra-b2b.notion.site/Interest-Protocol-a3ed3682872f4b72ae881bf17b5d0be3"
        target="_blank"
        rel="noreferrer"
      >
        <Button
          bg="#FFDA34"
          color="#000000"
          variant="filled"
          px={['xs', 'xs', 's']}
          nHover={{ bg: 'warning' }}
        >
          Guide
        </Button>
      </a>
      <Box
        gap="l"
        justifyContent="flex-end"
        display={['none', 'none', 'none', 'flex']}
      >
        <MovementNetwork />
      </Box>
      {currentAccount ? (
        <>
          <a
            href="https://faucet.devnet.imola.movementlabs.xyz"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="filled" px={['xs', 'xs', 's']}>
              Mint MOVE
            </Button>
          </a>
          <Profile />
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default Wallet;
