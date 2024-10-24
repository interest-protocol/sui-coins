import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';
import AirdropCommonAmountToggle from './airdrop-common-amount-toggle';

const AirdropCommonAmountField: FC = () => (
  <Box pb="m" display="flex" flexDirection="column" gap="s">
    <Box>
      <Typography variant="body" size="small">
        Enter Amount to Send
      </Typography>
      <AirdropCommonAmountTextField />
    </Box>
    <AirdropCommonAmountToggle />
  </Box>
);

export default AirdropCommonAmountField;
