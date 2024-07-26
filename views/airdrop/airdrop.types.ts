import { useSignTransaction } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui/client';
import {
  Transaction,
  TransactionObjectArgument,
} from '@mysten/sui/transactions';
import { WalletAccount } from '@wallet-standard/base';
import { Dispatch, SetStateAction } from 'react';

import { NFTCollectionMetadata } from '@/interface';

import { CoinObject } from '../../components/web3-manager/coins-manager/coins-manager.types';

export interface AirdropData {
  address: string;
  amount: string;
}

export type TMethod = 'csv' | 'nft' | 'addressList';

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
  asset?: CoinObject | NFTCollectionMetadata;
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
  onClose: () => void;
  setIsProgressView: Dispatch<SetStateAction<boolean>>;
}

export interface AirdropSummaryProps {
  method: TMethod;
}

export interface SendAirdropArgs {
  suiClient: SuiClient;
  tx: Transaction;
  contractPackageId: string;
  tokenType: string;
  coinToSend: TransactionObjectArgument;
  batch: readonly AirdropData[];
  currentAccount: WalletAccount;
  signTransaction: ReturnType<typeof useSignTransaction>;
}
export interface AirdropPreviewButtonProps {
  handleOpenSummaryModal: () => void;
}
