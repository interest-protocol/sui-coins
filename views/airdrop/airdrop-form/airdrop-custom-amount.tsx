import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AirdropCustomAmountProps } from '../airdrop.types';

const AirdropCustomAmount: FC<AirdropCustomAmountProps> = ({
  message,
  isCustomAmountActive,
  handleCustomAmount,
}) => {
  return (
    <Box p="1rem" my="1rem" borderRadius="xs" width="100%" bg="#F8F9FD">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography as="h1" size="medium" variant="body">
          Custom amounts
        </Typography>
        <ToggleButton
          onClick={handleCustomAmount}
          defaultValue={isCustomAmountActive}
          name="custom amount"
        />
      </Box>
      <Typography size="small" variant="title" color="outline" mt="0.5rem">
        {message}
      </Typography>
    </Box>
  );
};

export default AirdropCustomAmount;
