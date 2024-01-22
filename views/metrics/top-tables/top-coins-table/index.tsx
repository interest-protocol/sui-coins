import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import TableHead from '../table-head';
import TopPoolsTableBody from './top-pools-table-body';

const TopCoinsTable: FC = () => {
  return (
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
          title="Top coins"
          columns={['Coins', 'TVL', '1d volume', '30d volume']}
        />
        <TopPoolsTableBody />
      </Box>
    </Box>
  );
};

export default TopCoinsTable;
