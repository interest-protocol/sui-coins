import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useForm } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { FindPoolForm } from '../../find-pool-modal.types';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ index }) => {
  const { register, setValue } = useForm<FindPoolForm>();

  return (
    <Box
      display="flex"
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
          {...register(`tokens.${index}.symbol`, {
            onChange: (v: ChangeEvent<HTMLInputElement>) => {
              setValue?.(
                `tokens.${index}.symbol`,
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
