import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CoinsIllustration from './coins-illustration';

const Illustration: FC = () => (
  <Box
    mb="3xl"
    width="100%"
    alignItems="center"
    position="relative"
    maxWidth="34.375rem"
    flexDirection="column"
    justifyContent="center"
    display={['none', 'none', 'none', 'flex']}
  >
    <Box
      width="100%"
      position="relative"
      height={['30.75rem', '30.75rem', '30.75rem', '41.5rem']}
    >
      <CoinsIllustration maxHeight="40rem" maxWidth="35rem" />
    </Box>
  </Box>
);

export default Illustration;
