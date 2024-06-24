import { Control, UseFormSetValue } from 'react-hook-form';

import { ISwapSettings } from '../../swap.types';

export interface ManageSlippageProps {
  noAgg?: boolean;
  handleManageView: () => void;
}

export interface SlippageInfoProps extends ManageSlippageProps {
  isOpen: boolean;
}
export interface SwapAggregatorManagerProps {
  control: Control<ISwapSettings>;
  setValue: UseFormSetValue<ISwapSettings>;
}
