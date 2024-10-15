import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';

export interface MergeFieldProps extends CoinObject {
  remove: (type: string) => void;
}

export interface IMergeForm {
  executionTime: number;
  ignored: ReadonlyArray<string>;
}
