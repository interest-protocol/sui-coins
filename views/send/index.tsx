import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { ClockSVG, UploadSVG } from '@/svg';

import SendButton from './send-button';
import SendSelectObject from './send-select-object';

const Send: FC = () => (
  <Layout>
    <Box my="3rem" display="flex" justifyContent="center">
      <Tabs
        items={[
          <Box key={v4()} display="flex" alignItems="center" gap="xs">
            <Typography variant="label" size="large">
              Send
            </Typography>
            <UploadSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Box>,
          <Box key={v4()} display="flex" alignItems="center" gap="xs">
            <Typography variant="label" size="large">
              History
            </Typography>
            <ClockSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
          </Box>,
        ]}
        type="circle"
      />
    </Box>
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
      <SendButton />
    </Box>
  </Layout>
);

export default Send;
