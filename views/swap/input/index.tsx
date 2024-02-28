import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import SwapFormFieldSlider from '../swap-manager/swap-manager-slider';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import InputErrorMessage from './input-error-message';
import Token from './token';

const Input: FC<InputProps> = ({ label }) => {
  const { control, register, setValue } = useFormContext();

  const balance = useWatch({
    control,
    name: `${label}.balance`,
  });

  const locked = useWatch({
    control: control,
    name: `${label}.locked`,
  });

  return (
    <>
      <Box py="l">
        <HeaderInfo label={label} balance={balance} />
        <Box pl="l" pt="1rem" display="flex" justifyContent="space-between">
          <Token label={label} />
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <TextField
              pr="0rem"
              pl="-1rem"
              disabled={locked}
              placeholder="0.0"
              textAlign="right"
              fontSize="1.375rem"
              lineHeight="1.75rem"
              {...register(`${label}.value`, {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  setValue?.(
                    `${label}.value`,
                    parseInputEventToNumberString(v)
                  );
                  setValue('lock', false);
                },
              })}
              fieldProps={{
                width: '100%',
                border: 'none !important',
              }}
            />
            <InputErrorMessage label={label} />
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
    </>
  );
};

export default Input;
