import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { safePoolSymbolFromType } from '@/utils';
import { PoolForm } from '@/views/pools/pools.types';

const PoolFormDepositReceive: FC = () => {
  const { control } = useFormContext<PoolForm>();
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });
  const type = useWatch({ control, name: 'lpCoin.type' });
  const value = useWatch({ control, name: 'lpCoin.value' });
  const loading = useWatch({ control, name: 'isFindingPool' });

  return (
    <Box>
      <Typography variant="body" size="large" mb="m">
        You will receive (estimated):
      </Typography>
      <Box borderRadius="xs" bg="container" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            {symbol || safePoolSymbolFromType(type ?? '') || ''}
          </Typography>
          {loading ? (
            <ProgressIndicator size={16} variant="loading" />
          ) : (
            <Typography variant="body" ml="m" size="large">
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;
