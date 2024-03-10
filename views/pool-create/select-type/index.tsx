import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCreateButton from '../pool-create-button';
import SelectTypeAMM from './select-type-amm';
import SelectTypeCLAMM from './select-type-clamm';

const SelectType: FC = () => (
  <>
    <Box my="xl">
      <Box
        mx="auto"
        gap="2rem"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <SelectTypeAMM />
        <SelectTypeCLAMM />
      </Box>
    </Box>
    <PoolCreateButton />
  </>
);

export default SelectType;
