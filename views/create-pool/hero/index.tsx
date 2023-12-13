import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Illustration from '../illustration';

const Hero: FC = () => {
  return (
    <Box
      mb="3xl"
      width="25rem"
      height="30rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      maxWidth="34.375rem"
      flexDirection="column"
    >
      <Illustration />
      {/* {!isConnected && (
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
      )} */}
    </Box>
  );
};

export default Hero;
