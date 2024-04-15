import { UseFormGetValues } from 'react-hook-form';
import { SWRResponse } from 'swr';

import { PoolForm } from '@/views/pools/pools.types';

export interface FieldProps {
  getValues: UseFormGetValues<PoolForm>;
}

export interface PoolPreviewWrapperHeaderProps {
  isDeposit?: boolean;
}

interface WithSubmitFn {
  onSubmit: () => void;
}

export interface PoolPreviewProps
  extends PoolPreviewWrapperHeaderProps,
    WithSubmitFn,
    FieldProps {}

export interface PoolPreviewWrapperProps
  extends PoolPreviewWrapperHeaderProps,
    WithSubmitFn {
  fees: SWRResponse<Array<number> | undefined>;
}
