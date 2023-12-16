import { Dispatch, SetStateAction } from 'react';

import { CoinData } from '@/interface';

export interface IToken extends CoinData {
  balance: number;
}

export interface AirdropData {
  address: string;
  amount: string;
}

export interface IAirdropForm {
  token: IToken;
  error: string;
  decimals: number;
  done: ReadonlyArray<number>;
  failed: ReadonlyArray<number>;
  airdropList: ReadonlyArray<AirdropData> | null;
}

export interface AirdropUploadStatusCardProps {
  index: number;
  status: 'pending' | 'complete' | 'failed';
}

export interface AirdropUploadFileCardProps {
  size: number;
  name: string;
}

export interface AirdropButtonProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}
