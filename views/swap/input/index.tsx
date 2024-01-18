import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TextField } from '@/components';
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
    <Box
      py="l"
      borderRadius="xs"
      border="1px solid"
      borderColor="outlineVariant"
    >
      <HeaderInfo label={label} balance={balance} setValue={setValue} />
      <Box pl="l" pt="1rem" display="flex" justifyContent="space-between">
        <SelectToken label={label} balance={balance} />
        <TextField
          pl="-1rem"
          placeholder="000"
          textAlign="right"
          fontSize="1.375rem"
          lineHeight="1.75rem"
          fontFamily="Satoshi"
          {...register(`${label}.value`, {
            onChange: (v: ChangeEvent<HTMLInputElement>) => {
              setValue?.(`${label}.value`, parseInputEventToNumberString(v));
            },
          })}
          fieldProps={{ borderColor: 'transparent', width: '100%' }}
        />
      </Box>
    </Box>
  );
};

export default Input;
