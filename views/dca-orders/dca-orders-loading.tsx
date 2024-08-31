import { Box, ProgressIndicator } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const DCAOrdersLoading: FC = () => (
  <Box
    display="flex"
    borderRadius="s"
    minHeight="25rem"
    alignItems="center"
    bg="lowestContainer"
    justifyContent="center"
  >
    <ProgressIndicator variant="loading" />
  </Box>
);

export default DCAOrdersLoading;
