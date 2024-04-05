import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SendHistoryTable from './send-history-table';

const SendHistory: FC = () => (
  <Box
    mx="auto"
    width="100%"
    display="flex"
    maxWidth="50rem"
    borderRadius="s"
    overflow="hidden"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Typography p="xl" size="large" fontSize="5xl" variant="title">
      Transaction history
    </Typography>
    <SendHistoryTable />
  </Box>
);

export default SendHistory;
