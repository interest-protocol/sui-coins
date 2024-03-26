import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SendSelectButton from './send-select-button';

const SendSelectToken: FC = () => (
  <Box
    p="xl"
    gap="s"
    display="flex"
    borderRadius="xs"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body" size="large">
        1. Choose object
      </Typography>
    </Box>
    <SendSelectButton />
  </Box>
);

export default SendSelectToken;
