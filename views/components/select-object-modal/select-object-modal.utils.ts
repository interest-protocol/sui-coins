import {
  CoinObjectData,
  ObjectData,
} from '@/hooks/use-all-objects/all-objects.types';

export const isCoinObject = (object: ObjectData): object is CoinObjectData =>
  !!(object as CoinObjectData).display?.balance;
