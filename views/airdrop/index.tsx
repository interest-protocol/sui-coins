import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';

import AirdropForm from './airdrop-form';
import AirdropProgressIndicator from './airdrop-progress-indicator';
import AirdropUploadStatus from './airdrop-upload-status';

const Airdrop: FC = () => {
  const { reset } = useFormContext();
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
          <AirdropProgressIndicator
            goBack={() => {
              setIsProgressView(false);
              reset();
            }}
          />
          <AirdropUploadStatus />
        </Box>
      ) : (
        <AirdropForm setIsProgressView={setIsProgressView} />
      )}
    </Layout>
  );
};

export default Airdrop;
