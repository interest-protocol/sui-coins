import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import ActiveWallets from './active-wallets';
import DailyVolume from './daily-volume';
import TopCoinsTable from './top-tables/top-coins-table';
import TopPoolsTable from './top-tables/top-pools-table';
import TotalLiquidity from './total-liquidity';
import TVLPools from './tvl-pools';

const Metrics: FC = () => (
  <Layout>
    <Typography
      my="6xl"
      size="small"
      variant="display"
      textAlign="center"
      fontSize={['5xl', '8xl']}
    >
      Metrics
    </Typography>
    <Box
      variant="container"
      gap={['xs', 'xs', 'xs']}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
    >
      <TotalLiquidity />
      <DailyVolume />
      <ActiveWallets />
      <TVLPools />
      <TopPoolsTable />
      <TopCoinsTable />
    </Box>
  </Layout>
);

export default Metrics;
