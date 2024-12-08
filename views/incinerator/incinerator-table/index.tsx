import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import IncineratorTableBody from './incinerator-table-body';
import IncineratorTableHeader from './incinerator-table-header';

const IncineratorTable: FC = () => (
  <Box overflow={['auto', 'auto', 'unset', 'unset', 'unset']}>
    <Motion
      mt="2xs"
      as="table"
      rowGap="l"
      width="100%"
      borderSpacing="0 0.5rem"
      borderCollapse="separate"
    >
      <IncineratorTableHeader />
      <IncineratorTableBody />
    </Motion>
  </Box>
);

export default IncineratorTable;
