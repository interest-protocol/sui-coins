import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';
import AirdropCustomAmountTextArea from './airdrop-custom-amount-text-area';

const AirdropCustomAmountMethod: FC = () => (
  <Box>
    <Box pb="m" color="onSurface">
      <Typography variant="body" size="large" mb="m">
        3. Choose amount & who to send:
      </Typography>
      <Typography variant="body" size="small">
        Enter Amount to Send
      </Typography>
      <Box>
        <AirdropCommonAmountTextField />
      </Box>
    </Box>
    <AirdropCustomAmountTextArea />
  </Box>
);

export default AirdropCustomAmountMethod;
