import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputFieldProps } from './input.types';
import SelectToken from './select-token';

const FromInput: FC<Pick<InputFieldProps, 'slider'>> = ({ slider }) => {
  const { register, setValue, getValues, control } = useFormContext<SwapForm>();

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  return (
    <Box>
      <HeaderInfo label="from" />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken label="from" />
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <TextField
            pl="-1rem"
            fontSize="2xl"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            disabled={swapping}
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
              border: 'none !important',
              nHover: { border: 'none !important' },
              nFocus: { border: 'none !important' },
              nActive: { border: 'none !important' },
            }}
            {...register('from.display', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                const value = parseInputEventToNumberString(v);
                setValue('from.display', value);
                setValue(
                  'from.value',
                  FixedPointMath.toBigNumber(value, getValues('from.decimals'))
                );
              },
            })}
          />
          <AmountInDollar label="from" />
        </Box>
      </Box>
      <Box pb="s">{slider}</Box>
    </Box>
  );
};

export default FromInput;
