import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TableHead from '../table-head';
import TopPoolsTableBody from './top-pools-table-body';

const TopPoolsTable: FC = () => (
  <Box
    width="100%"
    display="flex"
    overflowX="auto"
    borderRadius="xs"
    overflowY="hidden"
    color="onSurface"
    gridColumn="1/-1"
    flexDirection="column"
    bg="lowestContainer"
  >
    <Box minWidth="55em">
      <TableHead
        title="Top pools"
        columns={[
          'Token Pair',
          'TVL',
          'apr',
          '24h volume',
          '7d volume',
          '30d volume',
        ]}
      />
      <TopPoolsTableBody />
    </Box>
  </Box>
);

export default TopPoolsTable;
