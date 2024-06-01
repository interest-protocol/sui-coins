import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DetailsTabItemProps } from './pool-details-tabs.types';

const DetailsTabItem: FC<DetailsTabItemProps> = ({ onChange, item }) => (
  <Box
    flex="1"
    height="2.8rem"
    display="flex"
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
