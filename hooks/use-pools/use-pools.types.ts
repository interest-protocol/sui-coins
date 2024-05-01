import { AmmPool, AmmServerPool } from '@/interface';

export interface UsePoolsFetchReturn {
  pools: readonly AmmServerPool[];
  totalItems: number;
}

export interface UsePoolsReturn {
  pools: readonly AmmPool[];
  totalItems: number;
}
