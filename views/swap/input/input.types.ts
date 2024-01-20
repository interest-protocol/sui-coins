import { UseFormSetValue } from 'react-hook-form';

import { SwapForm } from '../swap.types';

export interface InputProps {
  label: 'to' | 'from';
}

export interface SelectTokenProps extends InputProps {
  balance: string;
}

export interface HeaderInfoProps extends SelectTokenProps {
  setValue: UseFormSetValue<SwapForm>;
}
