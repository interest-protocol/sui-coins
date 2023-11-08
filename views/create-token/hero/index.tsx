import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';

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
          left="50%"
          bottom="5%"
          width="max-content"
          position="absolute"
          transform="translate(-50%, 0%)"
          display={['block', 'block', 'block', 'none']}
        >
          <Wallet />
        </Box>
      )}
    </Box>
  );
};

export default Hero;
