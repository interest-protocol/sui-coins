import { Box, Typography } from '@interest-protocol/ui-kit';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';
import { IAirdropForm } from '@/views/airdrop/airdrop.types';

import AirdropButton from './airdrop-button';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropSendingProgress from './airdrop-sending-progress';
import AirdropSummary from './airdrop-summary';
import AirdropUploadFile from './airdrop-upload-file';

interface AirdropBodyProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

const AirdropBody: FC<AirdropBodyProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  return token ? (
    <>
      <AirdropUploadFile />
      <AirdropSummary />
      <AirdropButton setIsProgressView={setIsProgressView} />
    </>
  ) : null;
};

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
        color="onSurface"
      >
        Airdrop
      </Typography>
      {isProgressView ? (
        <AirdropSendingProgress
          title="Sending"
          loadingProgress={52}
          description="This is the loading description. It can be anything you want and as long as you want. But please don't make it too long."
        />
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
          <AirdropBody setIsProgressView={setIsProgressView} />
        </Box>
      )}
    </Layout>
  );
};

export default Airdrop;
