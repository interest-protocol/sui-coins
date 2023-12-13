import { CoinData } from '@/interface';

export interface IToken extends CoinData {
  value: string;
  balance: number;
}

export interface IAirdropForm {
  token: IToken;
}
