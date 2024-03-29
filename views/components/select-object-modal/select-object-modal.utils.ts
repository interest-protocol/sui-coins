import {
  CoinObjectData,
  ObjectData,
} from '@/hooks/use-get-all-objects/use-get-all-objects.types';

export const isCoinObject = (object: ObjectData): object is CoinObjectData =>
  !!(object as CoinObjectData).display.balance;
