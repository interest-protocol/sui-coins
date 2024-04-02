import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout title="Create Coin">
    <Box
      my="3xl"
      display="flex"
      justifyContent="space-around"
      flexDirection={['column', 'column', 'column', 'row']}
    >
      <CreateTokenForm />
    </Box>
  </Layout>
);

export default CreateToken;
