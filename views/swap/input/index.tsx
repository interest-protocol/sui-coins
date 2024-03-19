import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';
import Slider from './slider';

const Input: FC<InputProps> = ({ label }) => {
  const { register, setValue } = useFormContext<SwapForm>();

  return (
    <Box>
      <HeaderInfo label={label} />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken label={label} />
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
            disabled={label === 'to'}
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
              border: 'none !important',
              nHover: { border: 'none !important' },
              nFocus: { border: 'none !important' },
              nActive: { border: 'none !important' },
            }}
            {...register(`${label}.value`, {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue?.(`${label}.value`, parseInputEventToNumberString(v));
              },
            })}
          />
          <AmountInDollar label={label} />
        </Box>
      </Box>
      <Box pb={label === 'to' ? '2xl' : 's'}>
        {label === 'from' && (
          <Box px="s">
            <Slider />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
