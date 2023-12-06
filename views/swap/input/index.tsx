import { Box } from '@interest-protocol/ui-kit';
import { TextField } from 'elements';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import DropdownToken from './dropdown-token';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';

const Input: FC<InputProps> = ({ label }) => {
  const { control, register, setValue } = useFormContext();

  const balance = useWatch({
    control,
    name: `${label}.balance`,
  });

  return (
    <Box
      border="1px solid"
      borderColor="outlineVariant"
      borderRadius="xs"
      py="l"
    >
      <HeaderInfo label={label} balance={balance} />
      <Box pl="l" pt="1rem" display="flex" justifyContent="space-between">
        <DropdownToken label={label} />
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
