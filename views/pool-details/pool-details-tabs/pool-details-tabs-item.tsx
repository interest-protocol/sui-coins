import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolDetailsTabsItemProps } from './pool-details-tabs.types';

const PoolsDetailsTabsItem: FC<PoolDetailsTabsItemProps> = ({
  isSelected,
  onChange,
  item,
}) => (
  <Box
    flex="1"
    display="flex"
    cursor="pointer"
    onClick={onChange}
    alignItems="center"
    justifyContent="center"
    borderBottom={isSelected ? '2px solid' : ''}
    borderBottomColor="primary"
  >
    <Typography size="medium" variant="body">
      {item}
    </Typography>
  </Box>
);
export default PoolsDetailsTabsItem;
