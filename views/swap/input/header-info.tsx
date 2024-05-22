import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { control } = useFormContext<SwapForm>();

  const symbol = useWatch({ control, name: `${label}.symbol` });

  return (
    <Box display="flex" justifyContent="space-between" color="onSurface">
      <Typography variant="label" size="medium" fontSize="s">
        You {label == 'from' ? 'pay' : 'receive'}
        <Typography
          as="span"
          size="small"
          variant="label"
          fontSize="s"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
    </Box>
  );
};

export default HeaderInfo;
