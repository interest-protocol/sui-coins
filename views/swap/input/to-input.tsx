import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { Aggregator, SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const ToInput: FC = () => {
  const { register, setValue, getValues, control } = useFormContext<SwapForm>();

  useWatch({ control, name: 'focusOut' });
  const swapping = useWatch({ control, name: 'swapping' });
  const aggregator = useWatch({ control, name: 'settings.aggregator' });

  const disabled = swapping || aggregator !== Aggregator.Aftermath;

  return (
    <>
      <HeaderInfo label="to" />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between" gap="xs">
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              disabled={disabled}
              fontFamily="Satoshi"
              fieldProps={{
                width: '100%',
                borderRadius: 'full',
              }}
              {...register('to.display', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  const value = parseInputEventToNumberString(v);
                  setValue('origin', 'to');
                  setValue('to.display', value);
                  setValue(
                    'to.value',
                    FixedPointMath.toBigNumber(value, getValues('to.decimals'))
                  );
                },
              })}
            />
          </Box>
          <SelectToken label="to" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <AmountInDollar label="to" />
          <Balance label="to" />
        </Box>
      </Box>
    </>
  );
};

export default ToInput;
