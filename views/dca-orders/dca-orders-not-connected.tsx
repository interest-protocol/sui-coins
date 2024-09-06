import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ErrorSVG } from '@/svg';

const DCAOrdersNotConnected: FC = () => (
  <Box
    display="flex"
    borderRadius="s"
    minHeight="25rem"
    alignItems="center"
    bg="lowestContainer"
    justifyContent="center"
  >
    <Box
      gap="m"
      color="error"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <ErrorSVG maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
      <Typography variant="label" size="medium">
        You are not connected
      </Typography>
    </Box>
  </Box>
);

export default DCAOrdersNotConnected;
