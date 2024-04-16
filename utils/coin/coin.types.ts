import { TransactionBlock } from '@mysten/sui.js/transactions';

import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface CreateVectorParameterArgs {
  txb: TransactionBlock;
  coinsMap: CoinsMap;
  type: string;
  amount: string;
}
