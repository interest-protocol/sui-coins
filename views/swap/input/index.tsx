import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import SwapFormFieldSlider from '../swap-manager/swap-manager-slider';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ label }) => {
  const { register, setValue } = useFormContext<SwapForm>();

  return (
    <Box>
      <HeaderInfo label={label} />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken label={label} />
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          flexDirection="column"
        >
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
          <AmountInDollar label={label} />
        </Box>
      </Box>
      <Box pb={label === 'to' ? '2xl' : 's'}>
        {label === 'from' && (
          <Box px="s">
            <SwapFormFieldSlider />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
