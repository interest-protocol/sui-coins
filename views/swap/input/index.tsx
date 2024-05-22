import { Box, ProgressIndicator, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import Balance from './balance';
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
      <Box
        pl="l"
        pt="l"
        pb="m"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <SelectToken label={label} />
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <TextField
            pl="-1rem"
            fontSize={['3xl', '5xl']}
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            nHover={{
              border: 'none',
            }}
            disabled={isFetching}
            Prefix={
              isFetching && <ProgressIndicator variant="loading" size={16} />
            }
            fieldProps={{
              width: '100%',
              border: 'none',
              nHover: {
                border: 'none',
              },
            }}
            {...register(`${label}.value`, {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue('lock', false);
                setValue?.(`${label}.value`, parseInputEventToNumberString(v));
              },
            })}
          />
        </Box>
      </Box>
      <Box
        pl="l"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Balance label={label} />
        <AmountInDollar label={label} />
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
