import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import AirdropButton from './airdrop-button';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropSummary from './airdrop-summary';
import AirdropUploadFile from './airdrop-upload-file';

const Airdrop: FC = () => (
  <Layout>
    <Typography
      my="2xl"
      size="small"
      variant="display"
      textAlign="center"
      fontSize={['5xl', '8xl']}
    >
      Airdrop
    </Typography>
    <Box
      p="xl"
      gap="4xl"
      mx="auto"
      display="flex"
      borderRadius="m"
      maxWidth="39.5rem"
      bg="lowestContainer"
      flexDirection="column"
    >
      <AirdropChooseCoin />
      <AirdropUploadFile />
      <AirdropSummary />
      <AirdropButton />
    </Box>
  </Layout>
);

export default Airdrop;
