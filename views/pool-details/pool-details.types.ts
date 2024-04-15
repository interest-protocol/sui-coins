import { PoolOption } from '../pools/pools.types';

export interface PoolDetailsFormProps {
  poolOptionView: PoolOption;
  handleOptionTab: (index: PoolOption) => void;
}

export enum PoolDetailsTabOption {
  Detail,
  Advance,
}
