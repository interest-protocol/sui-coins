import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import SendSelectObject from './send-select-object';

const Send: FC = () => (
  <Layout title="Send">
    <Box
      p="4xl"
      gap="xl"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      maxWidth="39.75rem"
      bg="lowestContainer"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
    >
      <Typography variant="title" size="large" textAlign="center">
        Create link
      </Typography>
      <Typography
        size="large"
        variant="body"
        color="outline"
        textAlign="center"
      >
        The funds can only be claim via the link once. You can also reclaim the
        funds if they have not been previously claimed.
      </Typography>
      <SendSelectObject />
    </Box>
  </Layout>
);

export default Send;
