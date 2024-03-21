import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FilterSVG } from '@/svg';

import Dropdown from './dropdown';
import FilterSelectedItem from './filter-selected-item';
import { FILTERS_DATA } from './pool-filter.data';

const PoolFilter: FC = () => (
  <Box mx="s" display="flex" color="onSurface" flexDirection="column">
    <Box
      pb="s"
      gap="2xs"
      alignItems="center"
      flexDirection="row"
      justifyContent="flex-start"
      gridTemplateColumns="1fr 1fr 1fr"
      display={['grid', 'flex']}
    >
      <Box
        zIndex="1"
        width="2.5rem"
        height="2.5rem"
        color="onSurface"
        borderRadius="xs"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        display={['none', 'none', 'inline-flex']}
      >
        <FilterSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
      </Box>

      {FILTERS_DATA.map((filter) => (
        <Dropdown
          key={v4()}
          Icon={filter.Icon}
          type={filter.type}
          label={filter.label}
          filterData={filter.data}
        />
      ))}
    </Box>
    <FilterSelectedItem />
  </Box>
);

export default PoolFilter;
