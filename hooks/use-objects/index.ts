import { v4 } from 'uuid';
import { create } from 'zustand';

import { AllObjects } from '../../components/web3-manager/all-objects-manager/all-objects.types';
import { UseObjectsResponse } from './use-objects.types';

export const useObjects = create<UseObjectsResponse>((set) => {
  const updateAllObjects = (response: AllObjects) =>
    set(() => {
      const ownedNfts = response?.ownedNfts ?? [];
      const otherObjects = response?.otherObjects ?? [];
      const coinsObjects = response?.coinsObjects ?? [];

      return {
        ownedNfts,
        otherObjects,
        coinsObjects,
      };
    });

  const updateLoading = (response: boolean) => set({ loading: response });

  const updateError = (response: boolean) => set({ error: response });

  const updateDelay = (delay: number | undefined) => set({ delay });

  const refresh = () => set({ id: v4() });

  return {
    id: v4(),
    error: false,
    delay: 10000,
    ownedNfts: [],
    loading: false,
    otherObjects: [],
    coinsObjects: [],
    refresh,
    updateDelay,
    updateError,
    updateLoading,
    updateAllObjects,
  };
});
