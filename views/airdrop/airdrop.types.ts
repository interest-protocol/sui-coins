import { CoinData } from '@/interface';

export interface IToken extends CoinData {
  value: string;
}

export interface IAirdropForm {
  token: IToken;
  file: File | null;
}

export interface AirdropUploadStatusCardProps {
  index: number;
  status: 'pending' | 'complete' | 'failed';
}

export interface AirdropUploadFileCardProps {
  name: string;
  size: number;
}
