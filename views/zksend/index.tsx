import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import ZkSendSelectObject from './zksend-select-object/zksend-select-button';

const ZkSend: FC = () => (
  <Layout title="zkSend">
    <Box
      mx="auto"
      width="100%"
      display="flex"
      borderRadius="2xl"
      maxWidth="39.75rem"
      flexDirection="column"
      px={['2xs', 'xl', 'xl', '7xl']}
    >
      <ZkSendSelectObject />
    </Box>
  </Layout>
);

export default ZkSend;
