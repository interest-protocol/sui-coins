import type { PoolTypeEnum } from '@/interface';

import { CoinData, PoolOption } from '../pools/pools.types';

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

export type PoolDetailsContext = {
  pool:
    | {
        stateKey: string;
        stable: boolean;
        lpCoin: CoinData;
        poolObjectId: string;
        poolType: PoolTypeEnum;
        tokens: ReadonlyArray<CoinData>;
      }
    | undefined;
};
