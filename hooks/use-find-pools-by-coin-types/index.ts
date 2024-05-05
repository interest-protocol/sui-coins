import { usePools } from '@/hooks/use-pools';

import { useWeb3 } from '../use-web3';

// TODO this will be improved on testnet deployment
export const useFindPoolsByCoinTypes = () => {
  const { isFetchingCoinBalances } = useWeb3();

  const { isLoading, ...extra } = usePools(1);

  return {
    isLoading: isLoading || isFetchingCoinBalances,
    ...extra,
  };
};
