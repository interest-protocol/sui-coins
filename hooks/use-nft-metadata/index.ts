import { create } from 'zustand';

import { NFTCollectionMetadata } from '@/interface';

import { UseNFTMetadataResponse } from './use-nft-metadata.types';

export const useNFTMetadata = create<UseNFTMetadataResponse>((set) => {
  const updateNFTMetadata = (response: ReadonlyArray<NFTCollectionMetadata>) =>
    set({
      nfts: response ?? [],
      nftsMap:
        response?.reduce?.((acc, curr) => ({ ...acc, [curr.id]: curr }), {}) ??
        {},
    });

  const updateLoading = (response: boolean) => set({ loading: response });

  const updateError = (response: boolean) => set({ error: response });

  return {
    nfts: [],
    nftsMap: {},
    error: false,
    loading: false,
    updateError,
    updateLoading,
    updateNFTMetadata,
  };
});
