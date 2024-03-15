import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { DCAForm } from '../dca.types';
import DCASlider from './dca-slider';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const Input: FC = () => {
  const { register, setValue } = useFormContext<DCAForm>();

  return (
    <Box>
      <HeaderInfo />
      <Box pl="l" pt="m" display="flex" justifyContent="space-between">
        <SelectToken />
        <Box
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <TextField
            pl="-1rem"
            fontSize="2xl"
            lineHeight="l"
            placeholder="0"
            color="onSurface"
            textAlign="right"
            fontFamily="Satoshi"
            fieldProps={{
              width: '100%',
              borderRadius: 'xs',
              borderColor: 'transparent',
              border: 'none !important',
              nHover: { border: 'none !important' },
              nFocus: { border: 'none !important' },
              nActive: { border: 'none !important' },
            }}
            {...register('from.value', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                setValue?.('to.value', parseInputEventToNumberString(v));
              },
            })}
          />
          <AmountInDollar />
        </Box>
      </Box>
      <Box pb="s">
        <Box px="s">
          <DCASlider />
        </Box>
      </Box>
    </Box>
  );
};

export default Input;
