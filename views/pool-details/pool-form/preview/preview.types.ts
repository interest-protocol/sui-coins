import { FieldValues, UseFormGetValues } from 'react-hook-form';

export interface PoolPreviewProps {
  isDeposit?: boolean;
  getValues: UseFormGetValues<FieldValues>;
}

export interface PoolPreviewWrapperProps {
  isDeposit?: boolean;
  onSubmit: () => void;
}
