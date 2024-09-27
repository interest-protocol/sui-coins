import type { ReactNode } from 'react';

export interface InputProps {
  label: 'from' | 'to';
}

export interface InputFieldProps extends InputProps {
  slider?: ReactNode;
}
