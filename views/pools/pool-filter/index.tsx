import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FilterButton from './filter-button';

const PoolFilter: FC = () => (
  <Box
    my="m"
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    borderRadius="xs"
    color="onSurface"
    bg="container"
  >
    <FilterButton />
  </Box>
);

export default PoolFilter;
