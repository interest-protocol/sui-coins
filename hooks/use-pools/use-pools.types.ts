import { AmmPool, AmmServerPool } from '@/interface';

export interface UsePoolsFetchReturn {
  pools: readonly AmmServerPool[];
  totalPages: number;
}

export interface UsePoolsReturn {
  pools: readonly AmmPool[];
  totalPages: number;
}
