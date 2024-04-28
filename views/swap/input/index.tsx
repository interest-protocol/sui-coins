import { Box, ProgressIndicator, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';
import SwapFormFieldSlider from './swap-manager-slider';

const Input: FC<InputProps> = ({ label }) => {
  const { register, setValue, control } = useFormContext<SwapForm>();

  const isFetching = useWatch({ control, name: `${label}.isFetchingSwap` });

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
            fontSize="2xl"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            disabled={isFetching}
            Prefix={
              isFetching && <ProgressIndicator variant="loading" size={16} />
            }
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
            }}
            {...register(`${label}.value`, {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue('lock', false);
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
            <SwapFormFieldSlider />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Input;
