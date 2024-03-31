import { Box, Typography } from '@interest-protocol/ui-kit';
import { useState } from 'react';
import { FC } from 'react';

import SendHistoryTable from './send-history-table';
import SendHistoryTabs from './send-history-tabs';

const SendHistory: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      maxWidth="39.75rem"
      bg="lowestContainer"
      flexDirection="column"
    >
      <Typography variant="title" size="large" fontSize="5xl" p="xl">
        Transaction history
      </Typography>
      <SendHistoryTabs tabIndex={tabIndex} onChangeTab={setTabIndex} />
      <SendHistoryTable />
    </Box>
  );
};

export default SendHistory;
