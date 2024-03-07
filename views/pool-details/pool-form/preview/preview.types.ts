import { FieldValues, UseFormGetValues } from 'react-hook-form';

export interface PoolPreviewProps extends PoolPreviewWrapperProps {
  getValues: UseFormGetValues<FieldValues>;
}

export interface PoolPreviewWrapperProps {
  isDeposit?: boolean;
  onSubmit: () => void;
}
