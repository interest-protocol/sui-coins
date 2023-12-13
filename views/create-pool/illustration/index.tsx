import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import CoinsIllustration from './coins-illustration';

const Illustration: FC = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height={['30.75rem', '30.75rem', '30.75rem', '41.5rem']}
    >
      <CoinsIllustration maxHeight="40rem" maxWidth="35rem" />
    </Box>
  );
};

export default Illustration;
