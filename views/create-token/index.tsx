import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout>
    <Box
      mt="10xl"
      gap="3xl"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="display" size="large">
        Create coin
      </Typography>
      <CreateTokenForm />
    </Box>
  </Layout>
);

export default CreateToken;
