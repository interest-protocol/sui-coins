import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { CreatePoolForm } from '../../pool-create.types';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ index }) => {
  const { register, setValue } = useFormContext<CreatePoolForm>();

  return (
    <Box
      display="flex"
      width="100%"
      borderRadius="xs"
      border="1px solid"
      position="relative"
      borderColor="outlineVariant"
      justifyContent="space-between"
    >
      <HeaderInfo index={index} />
      <SelectToken index={index} />
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
          {...register(`tokens.${index}.value`, {
            onChange: (v: ChangeEvent<HTMLInputElement>) => {
              setValue?.(
                `tokens.${index}.value`,
                parseInputEventToNumberString(v)
              );
            },
          })}
          fieldProps={{
            borderColor: 'transparent',
            borderRadius: 'xs',
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
};

export default Input;
