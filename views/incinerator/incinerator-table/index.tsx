import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IncineratorTableBody from './table-body';
import IncineratorTableHeader from './table-header';

const IncineratorTable: FC = () => (
  <Box mb="l" display="grid" gap="l">
    <Box overflowX="auto">
      <Motion as="table" rowGap="l" width="100%" mt="l">
        <IncineratorTableHeader />
        <IncineratorTableBody />
      </Motion>
    </Box>
  </Box>
);

export default IncineratorTable;
