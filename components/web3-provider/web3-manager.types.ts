import { SuiClient } from '@mysten/sui.js/client';
import { CoinStruct, PaginatedCoins } from '@mysten/sui.js/client';
import { WalletAccount } from '@wallet-standard/base';
import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import { LocalTokenMetadataRecord } from '@/interface';

export interface Web3ManagerSuiObject {
  type: string;
  symbol: string;
  totalBalance: BigNumber;
  objects: ReadonlyArray<CoinStruct>;
  decimals: number;
}

export interface Web3ManagerState {
  account: null | string;
  coins: ReadonlyArray<Web3ManagerSuiObject>;
  coinsMap: Record<string, Web3ManagerSuiObject>;
  connected: boolean;
  error: boolean;
  mutate: KeyedMutator<PaginatedCoins['data'] | undefined>;
  isFetchingCoinBalances: boolean;
  walletAccount: null | WalletAccount;
}

export interface Web3ManagerProps {
  children: ReactNode;
}

export interface ParseCoinsArgs {
  data: PaginatedCoins['data'] | undefined | never[];
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
