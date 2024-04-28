import { SuiClient } from '@mysten/sui.js/client';
import { PaginatedCoins } from '@mysten/sui.js/client';
import { WalletAccount } from '@wallet-standard/base';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import {
  CoinObject,
  CoinsMap,
} from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { LocalTokenMetadataRecord } from '@/interface';

export interface Web3ManagerState {
  error: boolean;
  coinsMap: CoinsMap;
  connected: boolean;
  account: null | string;
  isFetchingCoinBalances: boolean;
  coins: ReadonlyArray<CoinObject>;
  walletAccount: null | WalletAccount;
  mutate: KeyedMutator<CoinsMap>;
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
