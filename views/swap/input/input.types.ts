import { ReactNode } from 'react';

export interface InputProps {
  label: 'to' | 'from';
}

export interface InputFieldProps extends InputProps {
  slider?: ReactNode;
}
