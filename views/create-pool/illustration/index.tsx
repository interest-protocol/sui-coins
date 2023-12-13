import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import NaveIllustration from './nave-illustration';

const Illustration: FC = () => {
  return (
    <Box
      width="100%"
      position="relative"
      height={['30.75rem', '30.75rem', '30.75rem', '41.5rem']}
    >
      <NaveIllustration maxHeight="30rem" maxWidth="24rem" />
    </Box>
  );
};

export default Illustration;
