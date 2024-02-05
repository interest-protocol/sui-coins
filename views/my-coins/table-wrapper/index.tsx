import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { TableWrapperProps } from './table-wrapper.types';
import TableWrapperHeader from './table-wrapper-header';

const TableWrapper: FC<PropsWithChildren<TableWrapperProps>> = ({
  children,
  title,
  options,
}) => (
  <Box
    mb="xs"
    borderRadius="m"
    mx={[0, '11xl']}
    overflow="hidden"
    bg="lowestContainer"
    width={['calc(100vw - 3rem)', 'auto']}
    boxShadow="0px 24px 46px -10px rgba(13, 16, 23, 0.16)"
  >
    <Box
      p="1.5rem"
      fontWeight="500"
      fontSize={['1.375rem', '1.375rem', '1.375rem', '2rem']}
    >
      {title}
    </Box>
    <TableWrapperHeader options={options} />
    {children}
  </Box>
);

export default TableWrapper;
