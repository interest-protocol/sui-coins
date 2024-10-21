import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropCustomAmountTextArea from './airdrop-common-amount-text-area';
import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';
import AirdropCommonAmountToggle from './airdrop-common-amount-toggle';

const AirdropCustomAmountMethod: FC = () => (
  <Box>
    <Box pb="m">
      <Typography variant="body" size="large" mb="m">
        3. Choose amount & who to send:
      </Typography>
      <AirdropCommonAmountToggle />
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
