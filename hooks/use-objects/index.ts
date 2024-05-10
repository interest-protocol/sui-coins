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

  return {
    error: false,
    ownedNfts: [],
    loading: false,
    otherObjects: [],
    coinsObjects: [],
    updateError,
    updateLoading,
    updateAllObjects,
  };
});
