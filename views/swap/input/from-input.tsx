import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const FromInput: FC = () => {
  const { register, setValue, getValues, control } = useFormContext<SwapForm>();

  const swapping = useWatch({ control, name: 'swapping' });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const focus = useWatch({ control, name: 'focus' });

  return (
    <>
      <HeaderInfo label="from" />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between">
          <SelectToken label="from" />
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <TextField
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              textAlign="right"
              disabled={swapping}
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
              {...register('from.display', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('from.display', value);
                  setValue(
                    'from.value',
                    FixedPointMath.toBigNumber(
                      value,
                      getValues('from.decimals')
                    )
                  );
                },
              })}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Balance label="from" />
          <AmountInDollar label="from" />
        </Box>
      </Box>
    </>
  );
};

export default FromInput;
