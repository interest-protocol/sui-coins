import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Layout from '@/components/layout';

import AirdropButton from './airdrop-button';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropProgressIndicator from './airdrop-progress-indicator';
import AirdropSummary from './airdrop-summary';
import AirdropUploadFile from './airdrop-upload-file';
import AirdropUploadStatus from './airdrop-upload-status';

const Airdrop: FC = () => {
  const [isProgressView, setIsProgressView] = useState(false);

  return (
    <Layout>
      <Typography
        my="6xl"
        size="small"
        variant="display"
        textAlign="center"
        fontSize={['5xl', '8xl']}
      >
        Airdrop
      </Typography>
      {isProgressView ? (
        <Box
          gap="s"
          mx="auto"
          mb="10xl"
          width="100%"
          display="flex"
          maxWidth="39.5rem"
          flexDirection="column"
        >
          <AirdropProgressIndicator />
          <AirdropUploadStatus />
        </Box>
      ) : (
        <Box
          p="xl"
          gap="4xl"
          mx="auto"
          mb="10xl"
          display="flex"
          borderRadius="m"
          maxWidth="39.5rem"
          bg="lowestContainer"
          flexDirection="column"
        >
          <AirdropChooseCoin />
          <AirdropUploadFile />
          <AirdropSummary />
          <AirdropButton onSend={() => setIsProgressView(true)} />
        </Box>
      )}
    </Layout>
  );
};

export default Airdrop;
