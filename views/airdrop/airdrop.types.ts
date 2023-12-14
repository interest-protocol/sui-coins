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
  airdropList: ReadonlyArray<AirdropData> | null;
  error: string;
  decimals: number;
}

export interface AirdropUploadStatusCardProps {
  index: number;
  status: 'pending' | 'complete' | 'failed';
}

export interface AirdropUploadFileCardProps {
  size: number;
  name: string;
}
