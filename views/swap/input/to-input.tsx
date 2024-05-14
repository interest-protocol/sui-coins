import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const ToInput: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const value = useWatch({
    control,
    name: 'to.display',
  });

  return (
    <Box>
      <HeaderInfo label="to" />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken label="to" />
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <TextField
            disabled
            pl="-1rem"
            value={value}
            fontSize="2xl"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
              border: 'none !important',
              nHover: { border: 'none !important' },
              nFocus: { border: 'none !important' },
              nActive: { border: 'none !important' },
            }}
          />
          <AmountInDollar label="to" />
        </Box>
      </Box>
      <Box pb="2xl" />
    </Box>
  );
};

export default ToInput;
