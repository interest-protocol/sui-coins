import { CoinObject } from '../../resui/web3-manager/coins-manager/coins-manager.types';

export interface MergeFieldProps extends CoinObject {
  remove: (type: string) => void;
}

export interface IMergeForm {
  ignored: ReadonlyArray<string>;
}
