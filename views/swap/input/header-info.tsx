import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { control } = useFormContext<SwapForm>();

  const balance = useWatch({ control, name: `${label}.balance` });

  return (
    <Box px="l" display="flex" justifyContent="space-between">
      <Typography variant="label" size="small">
        {label}
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" gap="2xs">
        <Typography variant="label" size="small">
          Balance:
        </Typography>
        <Typography variant="label" size="small" color="primary">
          {balance || 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderInfo;
