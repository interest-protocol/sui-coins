import { CoinData } from '@/interface';

export interface Token extends CoinData {
  value: string;
  usdPrice: number | null;
}

export enum CreatePoolStep {
  PoolType,
  PoolAlgorithm,
  PoolCoins,
  PoolSummary,
}

export interface CreatePoolForm {
  dex: string;
  isStable: boolean;
  step: CreatePoolStep;
  explorerLink: string;
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
