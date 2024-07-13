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
  error?: string;
  explorerLink: string;
  type: 'CLAMM' | 'AMM';
  tokens: ReadonlyArray<Token>;
}

export enum CreatePoolMessageEnum {
  atLeastOneCoin = 'You must have at least 1 MOV on your wallet',
  amountSuperior = 'amount is superior than your balance, try to reduce',
  safeBalanceAmount = 'amount is superior than safe balance, try to leave at least 0.1 MOVE',
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
