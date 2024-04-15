import { PoolOption } from '@/views/pools/pools.types';

export interface PoolFieldsProps extends PoolFormProps {
  index: number;
}

export interface PoolFormProps {
  poolOptionView: PoolOption;
}
