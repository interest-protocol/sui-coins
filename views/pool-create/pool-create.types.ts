import { CoinData } from '@/interface';

export interface Token extends CoinData {
  value: string;
}

export interface CreatePoolForm {
  dex: string;
  step: number;
  isStable: boolean;
  type: 'CLAMM' | 'AMM';
  tokens: ReadonlyArray<Token>;
}

export interface GetByteCodeArgs {
  imageUrl: string;
  description: string;
  coinTypes: string[];
  isStable: boolean;
}

export interface ExtractedCoinData {
  coinType: string;
  coinObjectId: string;
  treasuryCap: null | string;
  coinMetadata: null | string;
}
