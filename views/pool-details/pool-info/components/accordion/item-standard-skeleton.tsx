import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const PoolDetailsCollapseItemSkeleton: FC = () => {
  return (
    <Box
      py="s"
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography size="medium" variant="body">
        <Skeleton width="4rem" />
      </Typography>
      <Box
        px="m"
        py="xs"
        display="flex"
        borderRadius="xs"
        bg="lowContainer"
        color="onSurface"
        alignItems="center"
        justifyContent="space-between"
        width="10rem"
      >
        <Box width="100%">
          <Skeleton width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default PoolDetailsCollapseItemSkeleton;
