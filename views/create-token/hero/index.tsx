import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

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
  </Box>
);

export default Hero;
