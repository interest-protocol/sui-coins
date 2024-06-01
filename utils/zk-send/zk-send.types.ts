import { ZkBagContractOptions } from '@mysten/zksend';

export interface CreateClaimTransactionArgs {
  address: string;
  assets: any;
  sender: string;
  reclaimAddress?: string;
  contracts?: ZkBagContractOptions;
}
