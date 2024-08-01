import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formatMoney } from '@/utils';

import type { AnalyticsCardProps } from './analytics.types';

const AnalyticsCard: FC<AnalyticsCardProps> = ({
  Icon,
  title,
  loading,
  quantity,
}) => (
  <Box
    p="xl"
    gap="m"
    display="flex"
    borderRadius="xs"
    color="onSurface"
    bg="highContainer"
    flexDirection="column"
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
  </Box>
);

export default AnalyticsCard;
