import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import ConnectWalletButton from '@/components/wallet/connect-wallet-button';

import Illustration from '../illustration';
import Title from './title';

const Hero: FC = () => {
  const { isConnected } = useWalletKit();
  return (
    <Box
      mb="3xl"
      display="flex"
      position="relative"
      maxWidth="34.375rem"
      flexDirection="column"
    >
      <Title />
      <Illustration />
      {!isConnected && (
        <Box
          bottom="5%"
          width="100%"
          position="sticky"
          justifyContent="center"
          display={['flex', 'flex', 'flex', 'none']}
        >
          <Box>
            <ConnectWalletButton />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Hero;
