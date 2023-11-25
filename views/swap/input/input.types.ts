import { UseFormReturn } from 'react-hook-form';

import { SwapForm } from '../swap.types';

export interface InputProps {
  label: 'to' | 'from';
  formSwap: UseFormReturn<SwapForm>;
}

export interface HeaderInfoProps {
  label: 'to' | 'from';
  balance: number | null;
}
