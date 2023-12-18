import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import PoolTransaction from './pool-transaction';
import PoolCard from './pools-card';

const Pools: FC = () => (
  <Layout>
    <Typography my="2xl" size="large" variant="display" textAlign="center">
      Pools
    </Typography>
    <Box
      mx="auto"
      gap="0.5rem"
      flexDirection="column"
      gridTemplateColumns="62% 38%"
      display={['flex', 'flex', 'flex', 'grid']}
      width={['100%', '100%', '100%', '85%']}
    >
      <Box bg="lowestContainer" borderRadius="2rem" p="xl"></Box>
      <PoolTransaction />
      <PoolCard />
    </Box>
  </Layout>
);

export default Pools;
