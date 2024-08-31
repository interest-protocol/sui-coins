import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { IncineratorNoAssetsSVG } from '@/svg';

const DCAOrdersEmpty: FC = () => (
  <Box
    display="flex"
    borderRadius="s"
    minHeight="25rem"
    alignItems="center"
    bg="lowestContainer"
    justifyContent="center"
  >
    <Box gap="s" display="flex" alignItems="center" flexDirection="column">
      <IncineratorNoAssetsSVG
        maxHeight="7.375rem"
        maxWidth="6.625rem"
        width="100%"
      />
      <Typography variant="label" size="medium">
        You don’t have DCAs
      </Typography>
    </Box>
  </Box>
);

export default DCAOrdersEmpty;
