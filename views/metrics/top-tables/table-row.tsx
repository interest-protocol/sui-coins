import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { TableRowProps } from './table.types';

const TableRow: FC<PropsWithChildren<TableRowProps>> = ({
  children,
  numCols,
  title,
  withBG,
  isTableHead,
}) => (
  <>
    {title && (
      <Typography variant="title" size="large" fontSize="2rem" p="1.5rem">
        {title}
      </Typography>
    )}
    <Box
      color="onSurfaceVariant"
      px="2xl"
      py="m"
      borderBottom={isTableHead ? '.0625rem solid' : '0'}
      borderColor="outlineVariant"
      display="grid"
      columnGap="4xl"
      alignItems="center"
      textTransform="capitalize"
      transition="all 300ms ease-in-out"
      gridTemplateColumns={
        numCols === 6
          ? '3fr repeat(5, 1fr)'
          : numCols === 4
            ? '3fr repeat(3, 2fr)'
            : '0'
      }
      bg={withBG ? 'container' : 'inherit'}
    >
      {children}
    </Box>
  </>
);

export default TableRow;
