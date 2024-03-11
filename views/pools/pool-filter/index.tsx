import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterSVG } from '@/svg';

import Dropdown from './dropdown';
import FilterSelectedItem from './filter-selected-item';
import { Filters_Data } from './pool-filter.data';

const PoolFilter: FC = () => {
  return (
    <Box
      mx="m"
      display="flex"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems={['unset', 'unset', 'unset', 'center']}
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'flex-start']}
      >
        <Box
          mx={['auto', 'auto', 'auto', 'xs']}
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
        {Filters_Data.map((filter) => (
          <Dropdown
            key={v4()}
            type={filter.type}
            label={filter.label}
            filterData={filter.data}
          />
        ))}
      </Box>
      <FilterSelectedItem />
    </Box>
  );
};

export default PoolFilter;
