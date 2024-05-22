import { AMMPool } from '@/server/model/amm-pool';

export interface UsePoolsFetchReturn {
  totalPages: number;
  pools: ReadonlyArray<AMMPool>;
}

export interface UsePoolsReturn {
  done: boolean;
  totalPages: number;
  pools: ReadonlyArray<AMMPool>;
}
