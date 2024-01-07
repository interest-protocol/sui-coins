import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TableWrapperHeaderProps } from './table-wrapper.types';

const TableWrapperHeader: FC<TableWrapperHeaderProps> = ({ options }) => (
  <Box
    columnGap="xl"
    display="grid"
    py={['s', 'm']}
    px={['s', 'l']}
    fontSize={['xs', 's']}
    gridTemplateColumns={[
      `repeat(${options.length}, 1fr)`,
      `2rem repeat(${options.length}, 1fr)`,
    ]}
  >
    <Box display={['none', 'block']} />
    {options.map((option) => (
      <Box fontFamily="Proto" key={v4()}>
        {option}
      </Box>
    ))}
  </Box>
);

export default TableWrapperHeader;
