import { SuiClient } from '@mysten/sui/client';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';

export interface MergeFieldProps extends CoinObject {
  remove: (type: string) => void;
}

export interface IMergeForm {
  executionTime: number;
  ignored: ReadonlyArray<string>;
}

export interface GetObjectsToMergeArgs {
  account: string;
  suiClient: SuiClient;
  coinsToMerge: ReadonlyArray<CoinObject>;
}
