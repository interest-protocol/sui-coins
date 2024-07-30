import { CoinData } from '@/interface';

export interface Token extends CoinData {
  value: string;
}

export interface CreatePoolForm {
  dex: string;
  step: number;
  isStable: boolean;
  explorerLink: string;
  executionTime: number;
  tokens: ReadonlyArray<Token>;
}

export interface GetByteCodeArgs {
  decimals: number;
  totalSupply: bigint;
  name: string;
  imageUrl: string;
  symbol: string;
  recipient: string;
  description: string;
}

export interface ExtractedCoinData {
  coinType: string;
  coinObjectId: string;
  treasuryCap: null | string;
  coinMetadata: null | string;
}
