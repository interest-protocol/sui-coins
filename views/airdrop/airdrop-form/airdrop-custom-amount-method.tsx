import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IAirdropForm } from '../airdrop.types';
import AirdropCommonAmountTextField from './airdrop-common-amount-text-field';
import AirdropCustomAmount from './airdrop-custom-amount-container';
import AirdropCustomAmountTextArea from './airdrop-custom-amount-text-area';

const AirdropCustomAmountMethod: FC = () => {
  const { control } = useFormContext<IAirdropForm>();
  const eachAddressList = useWatch({
    control,
    name: 'eachAddressList',
  });
  return (
    <Box>
      <Box pb="m">
        <Typography variant="body" size="large" mb="m">
          3. Choose amount & who to send:
        </Typography>
        <AirdropCustomAmount
          eachAddressList={eachAddressList}
          message="Activate this option to send different amounts simultaneously to various wallets."
        />
        <Typography variant="body" size="medium">
          Enter amount to send {eachAddressList && 'for each'}
        </Typography>
        <Box>
          <AirdropCommonAmountTextField />
        </Box>
      </Box>
      <AirdropCustomAmountTextArea />
    </Box>
  );
};

export default AirdropCustomAmountMethod;
