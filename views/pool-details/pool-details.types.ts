import { PoolOption } from '../pools/pools.types';

export interface PoolDetailsProps extends PoolDetailsFormProps {
  objectId: string;
}

export interface PoolDetailsFormProps {
  poolOptionView: PoolOption;
  handleOptionTab: (index: PoolOption) => void;
}

export enum PoolDetailsTabOption {
  Detail,
  Advance,
}
