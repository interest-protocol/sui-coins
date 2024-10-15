import { DCAToken } from '@/views/dca/dca.types';
import { SwapToken } from '@/views/swap/swap.types';

export interface SuccessModalProps {
  transactionTime: string;
}

export interface SuccessModalTokenCardProps {
  to: SwapToken | DCAToken;
  from: SwapToken | DCAToken;
  withoutAmount?: boolean;
}
