import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

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
    <Box minHeight="100vh" />
  </Layout>
);

export default Metrics;
