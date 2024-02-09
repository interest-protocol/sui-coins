import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import InfoCardsList from './info-card';
import TopCoinsTable from './top-tables/top-coins-table';
import TopPoolsTable from './top-tables/top-pools-table';

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
      <InfoCardsList />
      <TopPoolsTable />
      <TopCoinsTable />
    </Box>
  </Layout>
);

export default Metrics;
