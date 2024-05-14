import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputFieldProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputFieldProps> = ({ label, slider }) => {
  const { register, setValue, getValues, control } = useFormContext<SwapForm>();

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  return (
    <Box py="5xl">
      <HeaderInfo label={label} />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between">
          <SelectToken label={label} />
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <TextField
              fontSize={['3xl', '5xl']}
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              textAlign="right"
              fontFamily="Satoshi"
              disabled={label === 'to' || swapping}
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
              {...register(
                `${label}.display`,
                label === 'from'
                  ? {
                      onChange: (v: ChangeEvent<HTMLInputElement>) => {
                        const value = parseInputEventToNumberString(v);
                        setValue(`${label}.display`, value);
                        setValue(
                          'from.value',
                          FixedPointMath.toBigNumber(
                            value,
                            getValues('from.decimals')
                          )
                        );
                      },
                    }
                  : {}
              )}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Balance label={label} />
          <AmountInDollar label={label} />
        </Box>
      </Box>
      {slider && <Box pb={label === 'to' ? '2xl' : 's'}>{slider}</Box>}
    </Box>
  );
};

export default Input;
