import { values } from 'ramda';
import { create } from 'zustand';

import { noop } from '@/utils';

import { CoinsMap } from '../../components/web3-manager/coins-manager/web3-manager.types';
import { UseCoinsResponse } from './use-coins.types';

export const useCoins = create<UseCoinsResponse>((set) => {
  const updateCoins = (response: CoinsMap) =>
    set({
      coinsMap: response ?? {},
      coins: values((response ?? {}) as CoinsMap),
    });

  const updateLoading = (response: boolean) => set({ loading: response });

  const updateError = (response: boolean) => set({ error: response });

  return {
    coins: [],
    error: false,
    coinsMap: {},
    mutate: noop,
    loading: false,
    updateCoins,
    updateError,
    updateLoading,
  };
});
