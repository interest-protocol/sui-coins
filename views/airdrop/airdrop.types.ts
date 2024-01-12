import { Dispatch, SetStateAction } from 'react';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';

export interface AirdropData {
  address: string;
  amount: string;
}

export type TMethod = 'csv' | 'nft' | 'coin' | 'customAmount';

export interface IAirdropForm {
  error: boolean;
  amount: number;
  method: TMethod;
  decimals: number;
  token: CoinObject;
  asset?: CoinObject;
  commonAmount: string;
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

export interface AirdropPreviewButtonProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

export interface AirdropProgressIndicatorProps {
  goBack: () => void;
}

export interface AirdropInputProps {
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

export interface AirdropPreviewModalProps {
  method: TMethod;
  isOpen: boolean;
  onClose: () => void;
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

export interface AirdropSummaryProps {
  method: TMethod;
}

export interface AirdropNftCoinsMethodProps {
  method: string;
}
