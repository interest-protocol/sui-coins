import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import BigNumber from 'bignumber.js';

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

export interface GetSafeValueArgs {
  coinValue: string;
  coinType: string;
  balance: BigNumber;
  decimals: number;
}
