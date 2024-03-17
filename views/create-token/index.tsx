import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import CreateTokenForm from './create-token-form';

const CreateToken: FC = () => (
  <Layout>
    <Typography
      my="6xl"
      size="small"
      variant="display"
      textAlign="center"
      fontSize={['5xl', '8xl']}
    >
      Create coin
    </Typography>
    <Box display="flex" justifyContent="center">
      <CreateTokenForm />
    </Box>
  </Layout>
);

export default CreateToken;
