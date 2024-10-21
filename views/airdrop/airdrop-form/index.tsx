import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AirdropInputProps } from '../airdrop.types';
import AirdropChooseCoin from './airdrop-choose-coin';
import AirdropChooseMethod from './airdrop-choose-method';
import AirdropInput from './airdrop-input';

const AirdropForm: FC<AirdropInputProps> = ({ setIsProgressView }) => (
  <Box
    gap="xs"
    mx="auto"
    display="flex"
    maxWidth="39.5rem"
    flexDirection="column"
  >
    <AirdropChooseMethod />
    <AirdropChooseCoin />
    <AirdropInput setIsProgressView={setIsProgressView} />
  </Box>
);

export default AirdropForm;
