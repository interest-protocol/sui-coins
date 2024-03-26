import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import SendSelectObject from './send-select-object/send-select-button';

const Send: FC = () => (
  <Layout title="Send">
    <Box
      p="4xl"
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="s"
      maxWidth="39.75rem"
      bg="lowestContainer"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
    >
      <SendSelectObject />
    </Box>
  </Layout>
);

export default Send;
