import { useWeb3 } from '@/hooks';
import { usePools } from '@/hooks/use-pools';

// TODO improve when we have many pools
export const useFindPoolsByCoinTypes = () => {
  const { coinsMap, isFetchingCoinBalances } = useWeb3();

  const { isLoading, data, ...extra } = usePools();

  const safeData = data ? data : [];
  return {
    isLoading: isLoading || isFetchingCoinBalances,
    data: safeData.filter((x) => coinsMap[x.coinTypes.lpCoin]),
    ...extra,
  };
};
