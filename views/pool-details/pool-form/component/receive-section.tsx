import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { PoolForm } from '@/views/pools/pools.types';

const PoolReceiveSection: FC = () => {
  const { control } = useFormContext<PoolForm>();
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });

  // TODO: calculate the amount
  const calculatedAmount = 0;

  return (
    <Box>
      <Typography variant="body" size="large" mb="m">
        You will receive (estimated):
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            {symbol}
          </Typography>
          <Typography variant="body" ml="m" size="large">
            {calculatedAmount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolReceiveSection;
