import { Box, TextField } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const ToInput: FC = () => {
  const { control } = useFormContext<SwapForm>();

  const value = useWatch({ control, name: 'to.value' });

  return (
    <Box py="5xl">
      <HeaderInfo label="to" />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between">
          <SelectToken label="to" />
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <TextField
              disabled
              value={value}
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              textAlign="right"
              fontFamily="Satoshi"
              fontSize={['3xl', '5xl']}
              fieldProps={{
                width: '100%',
                borderRadius: 'xs',
                borderColor: 'transparent',
                border: 'none !important',
                mr: '-1rem',
                nHover: { border: 'none !important' },
                nFocus: { border: 'none !important' },
                nActive: { border: 'none !important' },
              }}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Balance label="to" />
          <AmountInDollar label="to" />
        </Box>
      </Box>
    </Box>
  );
};

export default ToInput;
