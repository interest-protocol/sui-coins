import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';
import AirdropCustomAmount from './airdrop-custom-amount';
import AirdropCustomAmountTextArea from './airdrop-custom-amount-text-area';

const AirdropCustomAmountMethod: FC = () => (
  <Box>
    <Box pb="m">
      <Typography variant="body" size="large" mb="m">
        3. Choose amount & who to send:
      </Typography>
      <AirdropCustomAmount
        isCustomAmountActive={false}
        handleCustomAmount={() => console.log('handle custom amount')}
        message="Activate this option to send different amounts simultaneously to various wallets."
      />
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
