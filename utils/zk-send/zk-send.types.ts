import { ZkBagContractOptions } from '@mysten/zksend';

export interface CreateClaimTransactionArgs {
  address: string;
  assets: any;
  sender: string;
  reclaim: boolean;
  contracts?: ZkBagContractOptions;
}
