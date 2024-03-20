import { Dispatch, SetStateAction } from 'react';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinData } from '@/interface';

export interface IToken extends CoinData {
  balance: number;
}

export interface AirdropData {
  address: string;
  amount: string;
}

export type TMethod = 'csv' | 'addressList';

export interface IAirdropForm {
  token: IToken;
  error: boolean;
  method: TMethod;
  decimals: number;
  asset?: CoinObject;
  commonAmount: string;
  tokenUSDPrice?: number;
  done: ReadonlyArray<number>;
  failed: ReadonlyArray<number>;
  airdropList: ReadonlyArray<AirdropData> | null;
}

export interface AirdropUploadStatusCardProps {
  index: number;
  status: 'pending' | 'complete' | 'failed';
  lastBatchSize: number;
}

export interface AirdropUploadFileCardProps {
  size: number;
  name: string;
}

export interface AirdropProgressIndicatorProps {
  goBack: () => void;
}

export interface AirdropProgressProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

export interface AirdropPreviewButtonProps {
  handleOpenSummaryModal: () => void;
}

export interface AirdropPreviewModalProps extends AirdropProgressProps {
  method: TMethod;
  isOpen: boolean;
  onClose: () => void;
}

export interface AirdropSummaryProps {
  method: TMethod;
}
