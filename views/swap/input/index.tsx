import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import FromInput from './from-input';
import { InputFieldProps } from './input.types';
import ToInput from './to-input';

const Input: FC<InputFieldProps> = ({ label, slider }) =>
  label === 'from' ? (
    <Box py="5xl">
      <FromInput />
      {slider && <Box pb="s">{slider}</Box>}
    </Box>
  ) : (
    <ToInput />
  );

export default Input;
