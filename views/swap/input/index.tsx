import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString, ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';
import SwapFormFieldSlider from './swap-manager-slider';

const Input: FC<InputProps> = ({ label }) => {
  const { coinsMap } = useWeb3();
  const { register, setValue, getValues } = useFormContext<SwapForm>();

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
            disabled={label === 'to'}
            textAlign="right"
            fontFamily="Satoshi"
            {...register(`${label}.value`, {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue?.(
                  `${label}.value`,
                  parseInputEventToNumberString(
                    v,
                    FixedPointMath.toNumber(
                      coinsMap[getValues(`${label}.type`)]?.balance ??
                        ZERO_BIG_NUMBER,
                      coinsMap[getValues(`${label}.type`)]?.decimals ?? 0
                    )
                  )
                );
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
