import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterSVG } from '@/svg';
import { noop } from '@/utils';

import Dropdown from '../dropdown';
import { ALGORITHM_TYPE, COIN_TYPE, POOL_TYPE } from '../pool-filter.data';

const PoolFilter: FC = () => (
  <Box display="flex" flexDirection="column" mx="m">
    <Box
      p="xs"
      display="flex"
      bg="lowestContainer"
      color="onSurface"
      alignItems="center"
      borderRadius="xs"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent={['center', 'center', 'center', 'flex-start']}
    >
      <Box
        mx="xs"
        zIndex="1"
        width="2.5rem"
        height="2.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="onSurface"
        borderRadius="xs"
        flexDirection="column"
      >
        <FilterSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
      </Box>
      <Dropdown
        key={v4()}
        values={ALGORITHM_TYPE}
        label="Algorithm"
        onSelect={noop}
      />
      <Dropdown
        key={v4()}
        values={POOL_TYPE}
        label="Pool Type"
        onSelect={noop}
      />
      <Dropdown
        key={v4()}
        values={COIN_TYPE}
        label="Coin Type"
        onSelect={noop}
      />
    </Box>
  </Box>
);

export default PoolFilter;
