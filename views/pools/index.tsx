import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';
import PoolsCard from '@/views/pools/pools-card';

const Pools: FC = () => {
  return (
    <Layout>
      <Box
        my="2xl"
        fontFamily="Proto"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Pools
        <PoolsCard />
      </Box>
    </Layout>
  );
};

export default Pools;
