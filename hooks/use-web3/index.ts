import { useCoins } from '../use-coins';
import { UseWeb3Response } from './use-web3.types';

export const useWeb3 = (): UseWeb3Response => {
  const {
    delay,
    coins,
    coinsMap,
    error: coinsError,
    loading: coinsLoading,
    refresh: refreshCoins,
    updateDelay: updateDelayCoins,
  } = useCoins();

  const error = coinsError;
  const loading = coinsLoading;

  return {
    coins,
    error,
    delay,
    loading,
    coinsMap,
    mutate: refreshCoins,
    setDelay: updateDelayCoins,
  };
};
