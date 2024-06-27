import { Control, UseFormSetValue } from 'react-hook-form';

import { ISwapSettings } from '../../swap.types';

export interface HeaderProps
  extends Pick<SwapSettingsFromProps, 'handleManageView'> {
  isOpen: boolean;
}

export interface SwapAggregatorManagerProps {
  control: Control<ISwapSettings>;
  setValue: UseFormSetValue<ISwapSettings>;
}

export interface SwapSettingsFromProps {
  handleManageView: () => void;
}
