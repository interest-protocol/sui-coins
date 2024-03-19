import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { AirdropInputProps, IAirdropForm } from '@/views/airdrop/airdrop.types';

import AirdropInput from './airdrop-input';

const AirdropBody: FC<AirdropInputProps> = ({ setIsProgressView }) => {
  const { control } = useFormContext<IAirdropForm>();
  const token = useWatch({ control, name: 'token' });
  const method = useWatch({ control, name: 'method' });

  if (!token || !method) return null;

  return (
    <Box>
      <AirdropInput setIsProgressView={setIsProgressView} />
    </Box>
  );
};

export default AirdropBody;
