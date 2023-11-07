import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Wallet from '@/components/wallet';

import Illustration from '../illustration';
import Title from './title';

const Hero: FC = () => (
  <Box
    mb="3xl"
    display="flex"
    position="relative"
    maxWidth="34.375rem"
    flexDirection="column"
  >
    <Title />
    <Illustration />
    <Box
      display={['block', 'block', 'block', 'none']}
      left="50%"
      bottom="5%"
      width="max-content"
      position="absolute"
      transform="translate(-50%, 0%)"
    >
      <Wallet />
    </Box>
  </Box>
);

export default Hero;
