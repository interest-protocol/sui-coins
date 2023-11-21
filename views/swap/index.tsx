import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

const Swap: FC = () => {
  return (
    <Layout>
      <Box
        my="2xl"
        fontFamily="Proto"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Swap
      </Box>
    </Layout>
  );
};

export default Swap;
