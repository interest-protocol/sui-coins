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
  const { register, control, setValue, getValues } = useFormContext<SwapForm>();

  const aggregator = useWatch({ control, name: 'settings.aggregator' });

  return (
    <Box pt="5xl">
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
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              fontFamily="Satoshi"
              fieldProps={{
                width: '100%',
                borderRadius: 'full',
              }}
              disabled={!(aggregator === Aggregator.Aftermath)}
            />
          </Box>
          <SelectToken label="to" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <AmountInDollar label="to" />
          <Balance label="to" />
        </Box>
      </Box>
    </Box>
  );
};

export default ToInput;
