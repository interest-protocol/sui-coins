import { NFTCollectionMetadata } from '@/interface';

export interface UseNFTMetadataResponse {
  error: boolean;
  loading: boolean;
  nfts: ReadonlyArray<NFTCollectionMetadata>;
  nftsMap: Record<string, NFTCollectionMetadata>;
  updateError: (data: boolean) => void;
  updateLoading: (data: boolean) => void;
  updateNFTMetadata: (data: ReadonlyArray<NFTCollectionMetadata>) => void;
}
