import { values } from 'ramda';
import { v4 } from 'uuid';
import { create } from 'zustand';

import { noop } from '@/utils';

import { CoinsMap } from '../../components/web3-manager/coins-manager/coins-manager.types';
import { UseCoinsResponse } from './use-coins.types';

export const useCoins = create<UseCoinsResponse>((set) => {
  const updateCoins = (response: CoinsMap) =>
    set({
      coinsMap: response ?? {},
      coins: values((response ?? {}) as CoinsMap),
    });

  const updateLoading = (response: boolean) => set({ loading: response });

  const updateError = (response: boolean) => set({ error: response });

  const updateDelay = (delay: number | undefined) => set({ delay });

  const refresh = () => set({ id: v4() });

  return {
    id: v4(),
    coins: [],
    error: false,
    delay: 10000,
    coinsMap: {},
    mutate: noop,
    loading: false,
    refresh,
    updateDelay,
    updateCoins,
    updateError,
    updateLoading,
  };
});
