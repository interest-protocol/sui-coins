import { UseFormReturn } from 'react-hook-form';

import { ISwapSettingsForm } from '../swap.types';

export interface ManageSlippageProps {
  handleManageView: () => void;
  formSettings: UseFormReturn<ISwapSettingsForm>;
}

export interface SlippageInfoProps extends ManageSlippageProps {
  isOpen: boolean;
}
