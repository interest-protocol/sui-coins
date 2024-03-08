import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SelectStableCard from './select-stable-card';
import SelectVolatileCard from './select-volatile-card';

const SelectVolatility: FC = () => (
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
);

export default SelectVolatility;
