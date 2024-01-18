import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import SwapFormFieldSlider from '../swap-manager/swap-manager-slider';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ label }) => {
  const { control, register, setValue, getValues } = useFormContext<SwapForm>();

  const balance = useWatch({
    control,
    name: `${label}.balance`,
  });

  return (
    <Box>
      <HeaderInfo label={label} balance={balance} setValue={setValue} />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken label={label} balance={balance} />
        <TextField
          pl="-1rem"
          placeholder="0"
          color="onSurface"
          textAlign="right"
          fontSize="2xl"
          lineHeight="l"
          fontFamily="Satoshi"
          {...register(`${label}.value`, {
            onChange: (v: ChangeEvent<HTMLInputElement>) => {
              setValue?.(`${label}.value`, parseInputEventToNumberString(v));
            },
          })}
          fieldProps={{
            borderColor: 'transparent',
            borderRadius: 'xs',
            width: '100%',
          }}
        />
      </Box>
      <Box pb={label === 'to' ? '2xl' : 's'}>
        {label === 'from' && (
          <Box px="s">
            <SwapFormFieldSlider
              setValue={setValue}
              balance={balance ?? 0}
              currentValue={+getValues('from.value')}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
