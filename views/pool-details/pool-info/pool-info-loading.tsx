import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import PoolDetailsCollapseItemSkeleton from './components/accordion/item-standard-skeleton';

const PoolInfoLoading: FC = () => (
  <Box m="1rem">
    {Array.from({ length: 7 }).map(() => (
      <PoolDetailsCollapseItemSkeleton key={v4()} />
    ))}
  </Box>
);

export default PoolInfoLoading;
