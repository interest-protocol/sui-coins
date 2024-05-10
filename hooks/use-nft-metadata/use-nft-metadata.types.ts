import { SuiClient } from '@mysten/sui.js/client';
import { PaginatedCoins } from '@mysten/sui.js/client';

import { LocalTokenMetadataRecord, NFTCollectionMetadata } from '@/interface';

import { CoinsMap } from '../../components/web3-manager/coins-manager/web3-manager.types';

export interface UseNFTMetadataResponse {
  error: boolean;
  loading: boolean;
  nfts: ReadonlyArray<NFTCollectionMetadata>;
  nftsMap: Record<string, NFTCollectionMetadata>;
  updateError: (data: boolean) => void;
  updateLoading: (data: boolean) => void;
  updateNFTMetadata: (data: ReadonlyArray<NFTCollectionMetadata>) => void;
}

export interface ParseCoinsArgs {
  data: CoinsMap;
  localTokens: LocalTokenMetadataRecord;
}

export interface GetAllCoinsArgs {
  client: SuiClient;
  account: string;
}

export interface GetAllCoinsInternalArgs extends GetAllCoinsArgs {
  data: PaginatedCoins['data'];
  cursor: PaginatedCoins['nextCursor'];
  hasNextPage: boolean;
}
