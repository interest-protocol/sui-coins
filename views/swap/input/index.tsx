import { FC } from 'react';

import FromInput from './from-input';
import { InputFieldProps } from './input.types';
import ToInput from './to-input';

const Input: FC<InputFieldProps> = ({ label, slider }) =>
  label === 'from' ? <FromInput slider={slider} /> : <ToInput />;

export default Input;
