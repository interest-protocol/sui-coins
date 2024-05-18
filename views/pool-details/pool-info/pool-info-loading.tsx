import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Accordion from './components/accordion';
import PoolDetailsCollapseItemSkeleton from './components/accordion/item-standard-skeleton';

const PoolInfoLoading: FC = () => (
  <Box>
    <Accordion loading>
      {Array.from({ length: 5 }).map(() => (
        <PoolDetailsCollapseItemSkeleton key={v4()} />
      ))}
    </Accordion>
    <Accordion loading>
      {Array.from({ length: 2 }).map(() => (
        <PoolDetailsCollapseItemSkeleton key={v4()} />
      ))}
    </Accordion>
  </Box>
);

export default PoolInfoLoading;
