import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import ActiveWallets from './active-wallets';
import StatsCardsList from './cards';
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
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      gap={['xs', 'xs', 'xs']}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
    >
      <StatsCardsList />
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
