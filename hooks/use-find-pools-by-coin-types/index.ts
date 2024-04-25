import { POOLS_MAP, SC_V_ETH_USDC, SC_V_MOVE_ETH } from '@/constants/coins';
import { useWeb3 } from '@/hooks';
import { usePools } from '@/hooks/use-pools';

// TODO this will be improved on testnet deployment
export const useFindPoolsByCoinTypes = () => {
  const { coins, isFetchingCoinBalances } = useWeb3();

  const poolIds = coins
    .filter((x) => x.type === SC_V_ETH_USDC || x.type === SC_V_MOVE_ETH)
    .map((x) => POOLS_MAP[x.type]);

  const { isLoading, ...extra } = usePools(poolIds);

  return {
    isLoading: isLoading || isFetchingCoinBalances,
    ...extra,
  };
};
