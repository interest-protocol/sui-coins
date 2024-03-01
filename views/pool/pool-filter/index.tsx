import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterSVG } from '@/svg';

import Dropdown from '../dropdown';
import { ALGORITHM_TYPE, COIN_TYPE, POOL_TYPE } from './pool-filter.data';

const PoolFilter: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      borderRadius="xs"
      color="onSurface"
      bg="container"
    >
      <Box p="m" display="flex">
        <Button
          isIcon
          my="auto"
          display="flex"
          width="2rem"
          height="2rem"
          bg="surface"
          color="onSurface"
          variant="filled"
          nHover={{
            backgroundColor: 'container',
          }}
        >
          <FilterSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Button>
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
    </Box>
  );
};

export default PoolFilter;
