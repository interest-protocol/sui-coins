import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import InfoCardsList from './info-card';

const Metrics: FC = () => (
  <Layout>
    <Box maxWidth="100%">
      <Typography
        my="6xl"
        size="small"
        variant="display"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Metrics
      </Typography>
      <InfoCardsList />
    </Box>
  </Layout>
);

export default Metrics;
