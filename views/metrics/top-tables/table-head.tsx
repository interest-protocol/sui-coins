import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TableHeadProps } from './table.types';
import TableRow from './table-row';

const TableHead: FC<TableHeadProps> = ({ title, columns }) => {
  return (
    <>
      <TableRow numCols={columns.length as 4 | 6} title={title} isTableHead>
        {columns.map((description, index) => (
          <Typography
            key={v4()}
            variant="label"
            size="large"
            opacity={0.6}
            textAlign={index ? 'center' : 'left'}
          >
            {description}
          </Typography>
        ))}
      </TableRow>
    </>
  );
};

export default TableHead;
