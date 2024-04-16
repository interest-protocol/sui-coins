import { useSignTransactionBlock } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface CreateVectorParameterArgs {
  txb: TransactionBlock;
  coinsMap: CoinsMap;
  type: string;
  amount: string;
  isDev?: boolean;
  suiClient: SuiClient;
  signTxb: ReturnType<typeof useSignTransactionBlock>;
}
