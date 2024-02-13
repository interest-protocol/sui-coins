import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const TopTableSkeleton: FC = () => (
  <Box px="m" py="s" display="flex" flexDirection="column">
    <Skeleton height="2.5rem" width="100%" />
    <Skeleton height="2.5rem" width="100%" />
    <Skeleton height="2.5rem" width="100%" />
  </Box>
);

export default TopTableSkeleton;
