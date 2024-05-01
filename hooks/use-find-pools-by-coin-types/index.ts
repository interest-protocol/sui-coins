import { useWeb3 } from '@/hooks';
import { usePools } from '@/hooks/use-pools';

// TODO improve when we have many pools
export const useFindPoolsByCoinTypes = () => {
  const { coinsMap, isFetchingCoinBalances } = useWeb3();

  const { isLoading, data, ...extra } = usePools();

  const safeData = data ? data : { pools: [], totalPages: 0 };

  return {
    isLoading: isLoading || isFetchingCoinBalances,
    data: safeData.pools.filter((x) => coinsMap[x.coinTypes.lpCoin]),
    ...extra,
  };
};
