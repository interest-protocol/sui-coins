import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterSVG } from '@/svg';

import Dropdown from '../dropdown';
import { ALGORITHM_TYPE, COIN_TYPE, POOL_TYPE } from '../pool-filter.data';

const PoolFilter: FC = () => (
  <Box
    py="2xs"
    display="flex"
    bg="container"
    color="onSurface"
    alignItems="center"
    borderRadius="xs"
    flexDirection={['column', 'column', 'column', 'row']}
    justifyContent={['center', 'center', 'center', 'flex-start']}
  >
    <Box
      mx="xs"
      my="xs"
      zIndex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="onSurface"
      minWidth="3rem"
      borderRadius="xs"
      flexDirection="column"
    >
      <FilterSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
    </Box>
    <Dropdown
      key={v4()}
      values={ALGORITHM_TYPE}
      label="Algorithm"
      onSelect={() => {}}
    />
    <Dropdown
      key={v4()}
      values={POOL_TYPE}
      label="Pool Type"
      onSelect={() => {}}
    />
    <Dropdown
      key={v4()}
      values={COIN_TYPE}
      label="Coin Type"
      onSelect={() => {}}
    />
  </Box>
);

export default PoolFilter;
