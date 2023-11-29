import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import AccountInfo from '../account-info';
import MovementNetwork from '../account-info/movement-network';
import ConnectWalletButton from './connect-wallet-button';

const Wallet: FC = () => {
  const { isConnected } = useWalletKit();

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" gap="m">
        {isConnected && (
          <Box
            gap="l"
            justifyContent="flex-end"
            display={['none', 'none', 'none', 'flex']}
          >
            <MovementNetwork />
          </Box>
        )}
        <AccountInfo />
      </Box>
      {!isConnected && (
        <Box display={['none', 'none', 'none', 'flex']}>
          <ConnectWalletButton />
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
