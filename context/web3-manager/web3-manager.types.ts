import { SuiClient } from '@mysten/sui.js/client';
import { PaginatedCoins } from '@mysten/sui.js/client';
import { WalletAccount } from '@wallet-standard/base';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import {
  CoinObject,
  CoinsMap,
} from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { LocalTokenMetadataRecord, NFTCollectionMetadata } from '@/interface';

export interface Web3ManagerState {
  error: boolean;
  connected: boolean;
  coinsMap: CoinsMap;
  account: null | string;
  mutate: KeyedMutator<CoinsMap>;
  isFetchingCoinBalances: boolean;
  coins: ReadonlyArray<CoinObject>;
  walletAccount: null | WalletAccount;
  nfts: ReadonlyArray<NFTCollectionMetadata>;
  nftsMap: Record<string, NFTCollectionMetadata>;
}

export interface Web3ManagerProps {
  children: ReactNode;
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
