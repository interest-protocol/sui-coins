import { CoinStruct, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import BigNumber from 'bignumber.js';

import { CoinsMap } from '@/components/web3-manager/coins-manager/coins-manager.types';

export interface GetCoinsArgs {
  suiClient: SuiClient;
  account: string;
  coinType: string;
  cursor?: string | null;
}

export interface GetCoinOfValueArgs {
  suiClient: SuiClient;
  tx: Transaction;
  account: string;
  coinType: string;
  coinValue: number | bigint | string;
}

export interface CoinOfValueArgs {
  tx: Transaction;
  coinType: string;
  coinsMap: CoinsMap;
  coinValue: number | bigint | string;
}

export interface GetSafeValueArgs {
  coinValue: string;
  coinType: string;
  balance: BigNumber;
  decimals: number;
}

export type TGetAllCoins = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;
