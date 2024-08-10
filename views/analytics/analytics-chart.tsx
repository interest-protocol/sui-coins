import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import BarChartComponent from '@/components/bar-chart';

import { AnalyticsChartProps } from './analytics.types';

const AnalyticsChart: FC<AnalyticsChartProps> = ({ loading, data, title }) => (
  <Box
    p="2xl"
    gap="m"
    display="flex"
    gridRow="span 2"
    borderRadius="s"
    bg="highContainer"
    flexDirection="column"
  >
    <Typography variant="title" size="large" color="onSurface">
      {title}
    </Typography>
    {loading ? <Skeleton height="12rem" /> : <BarChartComponent data={data} />}
  </Box>
);

export default AnalyticsChart;
