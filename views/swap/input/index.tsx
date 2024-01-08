import { Box, Slider, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ label }) => {
  const { control, register, setValue } = useFormContext<SwapForm>();

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
          fieldProps={{ borderColor: 'transparent', width: '100%' }}
        />
      </Box>
      <Box height="2rem">
        {label === 'from' && (
          <Box px="xl">
            <Slider
              initial={0}
              max={100}
              onChange={() => console.log('range')}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
