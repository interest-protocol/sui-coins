import { Box } from '@interest-protocol/ui-kit';
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
    <Layout title="Airdrop" features={['coins', 'objects', 'nfts']}>
      <Box width="100%">
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
      </Box>
    </Layout>
  );
};

export default Airdrop;
