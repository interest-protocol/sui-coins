import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TableHeadProps } from '../table.types';
import TableRow from '../table-row';

const TopPoolsTableHead: FC<TableHeadProps> = ({ title }) => {
  return (
    <>
      <TableRow numCols={6} title={title} isTableHead>
        <Typography variant="label" size="large" opacity={0.6}>
          Token Pair
        </Typography>
        <Typography
          size="large"
          opacity={0.6}
          variant="label"
          textAlign="center"
        >
          tvl
        </Typography>
        <Typography
          size="large"
          opacity={0.6}
          variant="label"
          textAlign="center"
        >
          apr
        </Typography>
        <Typography
          size="large"
          opacity={0.6}
          variant="label"
          textAlign="center"
        >
          24h volume
        </Typography>
        <Typography
          size="large"
          opacity={0.6}
          variant="label"
          textAlign="center"
        >
          7d volume
        </Typography>
        <Typography
          size="large"
          opacity={0.6}
          variant="label"
          textAlign="center"
        >
          30D volume
        </Typography>
      </TableRow>
    </>
  );
};

export default TopPoolsTableHead;
