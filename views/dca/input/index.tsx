import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { DCAForm } from '../dca.types';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const Input: FC = () => {
  const { register, setValue, getValues } = useFormContext<DCAForm>();

  return (
    <Box py="5xl" display="flex" flexDirection="column" gap="xs">
      <HeaderInfo label="from" />
      <Box
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box flex="1" display="flex">
          <TextField
            width="100%"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            Prefix={
              <Box ml="-0.75rem">
                <SelectToken label="from" />
              </Box>
            }
            fieldProps={{
              mx: 0,
              px: 0,
              width: '100%',
              height: '3.5rem',
              borderRadius: 'xs',
            }}
            {...register('from.display', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                const value = parseInputEventToNumberString(v);
                setValue('from.display', value);
                setValue(
                  'from.value',
                  FixedPointMath.toBigNumber(value, getValues('from.decimals'))
                );
              },
            })}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Input;
