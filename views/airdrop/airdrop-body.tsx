import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropBodyProps, IAirdropForm } from '@/views/airdrop/airdrop.types';

import AirdropButton from './airdrop-button';
import AirdropSummary from './airdrop-summary';
import AirdropUploadFile from './airdrop-upload-file';

const AirdropBody: FC<AirdropBodyProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });

  if (!token || !method) return null;

  return (
    <Box bg="lowestContainer" borderRadius="xs" p="xl">
      <AirdropUploadFile />
      <AirdropSummary />
      <AirdropButton setIsProgressView={setIsProgressView} />
    </Box>
  );
};

export default AirdropBody;
