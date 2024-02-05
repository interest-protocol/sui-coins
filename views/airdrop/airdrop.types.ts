import { Dispatch, SetStateAction } from 'react';

import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { NFTCollection } from '@/interface';

export interface AirdropData {
  address: string;
  amount: string;
}

export type TMethod = 'csv' | 'nft' | 'customAmount';

export interface IAirdropForm {
  error: boolean;
  amount: number;
  method: TMethod;
  decimals: number;
  token: CoinObject;
  commonAmount: string;
  tokenUSDPrice?: number;
  done: ReadonlyArray<number>;
  failed: ReadonlyArray<number>;
  asset?: CoinObject | NFTCollection;
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

export interface AirdropConfirmButtonProps {
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

export interface AirdropPreviewButtonProps {
  handleOpenSummaryModal: () => void;
}
