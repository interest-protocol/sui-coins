import { Box, Typography } from '@interest-protocol/ui-kit';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';

import AirdropButton from './airdrop-button';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropProgressIndicator from './airdrop-progress-indicator';
import AirdropSummary from './airdrop-summary';
import AirdropUploadFile from './airdrop-upload-file';
import AirdropUploadStatus from './airdrop-upload-status';

interface AirdropBodyProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

const AirdropBody: FC<AirdropBodyProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  return token ? (
    <Box bg="lowestContainer" borderRadius="xs" p="xl">
      <AirdropUploadFile />
      <AirdropSummary />
      <AirdropButton setIsProgressView={setIsProgressView} />
    </Box>
  ) : null;
};

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
          <AirdropBody setIsProgressView={setIsProgressView} />
        </Box>
      )}
    </Layout>
  );
};

export default Airdrop;
