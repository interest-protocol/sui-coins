import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCreateButton from '../pool-next-button';
import SelectStableCard from './select-stable-card';
import SelectVolatileCard from './select-volatile-card';

const SelectVolatility: FC = () => (
  <>
    <Box my="xl">
      <Box
        mx="auto"
        gap="2rem"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <SelectStableCard />
        <SelectVolatileCard />
      </Box>
    </Box>
    <PoolCreateButton />
  </>
);

export default SelectVolatility;
