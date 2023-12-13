import { CoinData } from '@/interface';

export interface IToken extends CoinData {
  value: string;
}

export interface IAirdropForm {
  token: IToken;
  file: File | null;
}
