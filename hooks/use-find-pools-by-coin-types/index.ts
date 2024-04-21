import { POOLS_MAP, SC_V_ETH_USDC, SC_V_SUI_ETH } from '@/constants/coins';
import { usePools } from '@/hooks/use-pools';

import { useWeb3 } from '../use-web3';

// TODO this will be improved on testnet deployment
export const useFindPoolsByCoinTypes = () => {
  const { coins, isFetchingCoinBalances } = useWeb3();

  const poolIds = coins
    .filter((x) => x.type === SC_V_ETH_USDC || x.type === SC_V_SUI_ETH)
    .map((x) => POOLS_MAP[x.type]);

  const { isLoading, ...extra } = usePools(poolIds);

  return {
    isLoading: isLoading || isFetchingCoinBalances,
    ...extra,
  };
};
