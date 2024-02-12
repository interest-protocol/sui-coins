import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import DailyVolume from './daily-volume';
import TopCoinsTable from './top-tables/top-coins-table';
import TopPoolsTable from './top-tables/top-pools-table';
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
    <Box variant="container">
      <DailyVolume />
      <Box
        gap="xs"
        width="100%"
        gridColumn="1/-1"
        flexDirection="column"
        gridTemplateColumns="1fr 1fr"
        display={['flex', 'flex', 'flex', 'grid']}
      >
        <TVLPools />
      </Box>
      <TopPoolsTable />
      <TopCoinsTable />
    </Box>
  </Layout>
);

export default Metrics;
