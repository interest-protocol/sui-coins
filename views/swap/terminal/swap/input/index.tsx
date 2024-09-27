import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FromInput from './from-input';
import { InputFieldProps } from './input.types';
import ToInput from './to-input';

const Input: FC<InputFieldProps> = ({ label, slider }) =>
  label === 'from' ? (
    <Box>
      <FromInput />
      {slider && <Box pb="l">{slider}</Box>}
    </Box>
  ) : (
    <ToInput />
  );

export default Input;
