import { Box, Chart, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useModal } from '@/hooks/use-modal';
import { formatMoney } from '@/utils';

import type { AnalyticsCardChartProps } from './analytics.types';

const AnalyticsCardChart: FC<AnalyticsCardChartProps> = ({
  Icon,
  data,
  label,
  title,
  loading,
  quantity,
}) => {
  const { setModal } = useModal();

  const openChart = () =>
    setModal(
      <Box
        p="2xl"
        gap="m"
        width="30rem"
        bg="container"
        display="flex"
        borderRadius="s"
        flexDirection="column"
      >
        <Typography variant="title" size="large" color="onSurface">
          {label}
        </Typography>
        <Chart variant="bar" data={data} />
      </Box>,
      { custom: true }
    );

  return (
    <Motion
      p="xl"
      gap="m"
      display="flex"
      cursor="pointer"
      borderRadius="xs"
      color="onSurface"
      bg="highContainer"
      onClick={openChart}
      flexDirection="column"
      animate={{ y: [0, -1, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, 0] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="title" size="medium">
          {title}
        </Typography>
        <Icon maxHeight="2rem" maxWidth="2rem" width="100%" />
      </Box>
      <Typography variant="headline" size="large">
        {loading ? <Skeleton width="10rem" /> : formatMoney(quantity, 0)}
      </Typography>
    </Motion>
  );
};

export default AnalyticsCardChart;
