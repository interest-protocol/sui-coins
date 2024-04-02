import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SendHistoryTable from './send-history-table';

const SendHistory: FC = () => (
  <Box
    mx="auto"
    width="100%"
    display="flex"
    borderRadius="s"
    overflow="hidden"
    maxWidth="39.75rem"
    bg="lowestContainer"
    flexDirection="column"
  >
    <Typography
      p="xl"
      size="large"
      fontSize="5xl"
      variant="title"
      borderBottom="1px solid"
      borderColor="container"
    >
      Transaction history
    </Typography>
    <SendHistoryTable />
  </Box>
);

export default SendHistory;
