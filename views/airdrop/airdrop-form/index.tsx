import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AirdropCoinProps } from '../airdrop.types';
import AirdropAddresses from './airdrop-addresses';
import AirdropChooseMethod from './airdrop-choose-method';
import AirdropCoin from './airdrop-coin';

const AirdropForm: FC<AirdropCoinProps> = ({ setIsProgressView }) => (
  <Box
    gap="xs"
    mx="auto"
    display="flex"
    maxWidth="39.5rem"
    flexDirection="column"
  >
    <AirdropChooseMethod />
    <AirdropAddresses />
    <AirdropCoin setIsProgressView={setIsProgressView} />
  </Box>
);

export default AirdropForm;
