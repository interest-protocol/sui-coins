import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SelectStableCard from './select-stable-card';

const SelectVolatility: FC = () => {
  return (
    <Box display="flex" gap="2rem">
      <SelectStableCard />
      <SelectStableCard />
    </Box>
  );
};

export default SelectVolatility;
