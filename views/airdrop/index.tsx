import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Layout from '@/components/layout';

import AirdropForm from './airdrop-form';
import AirdropProgressIndicator from './airdrop-progress-indicator';
import AirdropUploadStatus from './airdrop-upload-status';

const Airdrop: FC = () => {
  const { reset, control } = useFormContext();
  const [isProgressView, setIsProgressView] = useState(false);

  const method = useWatch({ control, name: 'method' });

  useEffect(() => {
    reset({ method });
  }, [method]);

  return (
    <Layout title="Airdrop" features={['coins', 'nfts']}>
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
