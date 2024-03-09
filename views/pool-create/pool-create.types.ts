import { CoinData } from '@/interface';

export interface Token extends CoinData {
  value: string;
}

export interface CreatePoolForm {
  dex: string;
  step: number;
  isStable: boolean;
  algorithm: 'CLAMM' | 'AMM';
  tokens: ReadonlyArray<Token>;
}
