import { UseFormGetValues } from 'react-hook-form';

import { PoolForm } from '@/views/pools/pools.types';

export interface PoolPreviewProps extends PoolPreviewWrapperProps {
  getValues: UseFormGetValues<PoolForm>;
}

export interface PoolPreviewWrapperProps {
  isDeposit?: boolean;
  onSubmit: () => void;
}
