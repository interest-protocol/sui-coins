import {
  CoinObjectData,
  ObjectData,
} from '@/components/web3-manager/all-objects-manager/all-objects.types';

export const isCoinObject = (object: ObjectData): object is CoinObjectData =>
  !!(object as CoinObjectData).display?.balance;
