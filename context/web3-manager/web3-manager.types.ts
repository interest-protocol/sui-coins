import { SuiClient } from '@mysten/sui.js/client';
import { PaginatedCoins } from '@mysten/sui.js/src/client';
import { WalletAccount } from '@wallet-standard/base';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import {
  CoinObject,
  CoinsMap,
} from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { LocalTokenMetadataRecord, NFTCollectionMetadata } from '@/interface';

export interface Web3ManagerState {
  nfts: ReadonlyArray<NFTCollectionMetadata>;
  nftsMap: Record<string, NFTCollectionMetadata>;
  account: null | string;
  coins: ReadonlyArray<CoinObject>;
  coinsMap: CoinsMap;
  connected: boolean;
  error: boolean;
  mutate: KeyedMutator<CoinsMap>;
  isFetchingCoinBalances: boolean;
  walletAccount: null | WalletAccount;
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
