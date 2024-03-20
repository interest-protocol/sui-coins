import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface CreateVectorParameterArgs {
  txb: TransactionBlock;
  coinsMap: CoinsMap;
  type: string;
  amount: string;
}

export interface GetCoinsArgs {
  suiClient: SuiClient;
  account: string;
  coinType: string;
  cursor?: string | null;
}

export interface GetCoinOfValueArgs {
  suiClient: SuiClient;
  txb: TransactionBlock;
  account: string;
  coinType: string;
  coinValue: number | bigint | string;
}
