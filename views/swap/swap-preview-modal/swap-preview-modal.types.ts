import { UseFormSetValue } from 'react-hook-form';

import { CoinDataWithBalance } from '@/views/components/select-token-modal/select-token-modal.types';

import { SwapForm } from '../swap.types';

export interface SelectTokenModalProps {
  closeModal: () => void;
  onSelect: (coin: CoinDataWithBalance) => void;
}

export interface PreviewModalInputProps {
  label: 'to' | 'from';
  alternativeText?: string;
  value: number;
}

export interface TokenProps extends PreviewModalInputProps {
  balance: number | null;
  symbol?: string;
  setValue: UseFormSetValue<SwapForm>;
}

export interface PreviewModalHeaderProps extends PreviewModalInputProps {}

export interface PreviewModalSummaryProps {
  exchangeRate: number;
  exchangeFee: number;
  networkFee: number;
}

export interface ConfirmSwapButtonProps {
  handleConfirmSwap: () => void;
}
