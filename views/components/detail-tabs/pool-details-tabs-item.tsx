import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DetailsTabItemProps } from './pool-details-tabs.types';

const DetailsTabItem: FC<DetailsTabItemProps> = ({ item, onChange }) => (
  <Box
    px="4xl"
    display="flex"
    height="2.8rem"
    cursor="pointer"
    onClick={onChange}
    alignItems="center"
    justifyContent="center"
  >
    <Typography size="medium" variant="body">
      {item}
    </Typography>
  </Box>
);
export default DetailsTabItem;
