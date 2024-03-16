import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';

import AirdropBody from './airdrop-body';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropChooseMethod from './airdrop-choose-method';
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
        color="onSurface"
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
        <Box
          gap="m"
          mx="auto"
          mb="10xl"
          display="flex"
          maxWidth="39.5rem"
          flexDirection="column"
        >
          <AirdropChooseCoin />
          <AirdropChooseMethod />
          <AirdropBody setIsProgressView={setIsProgressView} />
        </Box>
      )}
    </Layout>
  );
};

export default Airdrop;
