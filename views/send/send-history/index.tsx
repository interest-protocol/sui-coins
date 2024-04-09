import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import SendHistoryTable from './send-history-table';

const SendHistory: FC = () => (
  <Box
    mx="auto"
    display="flex"
    borderRadius="s"
    overflow="hidden"
    bg="lowestContainer"
    flexDirection="column"
    width={['auto', 'auto', '100%']}
    maxWidth={['calc(100vw - 3rem)', 'calc(100vw - 3rem)', '50rem']}
  >
    <Typography p="xl" size="large" fontSize="5xl" variant="title">
      Transaction history
    </Typography>
    <SendHistoryTable />
  </Box>
);

export default SendHistory;
