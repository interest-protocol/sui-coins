import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import MergeButton from './merge-button';
import MergeForm from './merge-fields';

const Merge: FC = () => (
  <Layout>
    <Box
      py="l"
      mb="m"
      px="xl"
      gap="l"
      mt="2xl"
      mx="auto"
      display="flex"
      bg="onPrimary"
      maxWidth="25rem"
      color="onSurface"
      borderRadius="xs"
      flexDirection="column"
    >
      <Typography variant="title" size="large" textAlign="center">
        Merge Coins
      </Typography>
      <MergeForm />
    </Box>
    <MergeButton />
  </Layout>
);

export default Merge;
