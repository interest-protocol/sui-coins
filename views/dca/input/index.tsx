import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { DCAForm } from '../dca.types';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const Input: FC = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<DCAForm>();

  return (
    <Box py="5xl" display="flex" flexDirection="column" gap="xs">
      <HeaderInfo label="from" />
      <Box
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <TextField
            status={
              (errors.from?.symbol?.message ?? errors.from?.display?.message)
                ? 'error'
                : undefined
            }
            width="100%"
            lineHeight="l"
            placeholder="0"
            textAlign="left"
            color="onSurface"
            fontFamily="Satoshi"
            supportingText={
              (errors.from?.type as any)?.message ??
              errors.from?.display?.message ??
              ''
            }
            Suffix={
              <Box mr="-0.6rem">
                <SelectToken label="from" />
              </Box>
            }
            fieldProps={{
              px: 0,
              mx: 0,
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
