import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FromInput from './from-input';
import { InputFieldProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputFieldProps> = ({ label, slider }) =>
  label === 'from' ? (
    <Box py="5xl">
      <FromInput />
      {slider && <Box pb="s">{slider}</Box>}
    </Box>
  ) : (
    <Box display="flex" flexDirection="column">
      <SelectToken label="to" />
    </Box>
  );

export default Input;
