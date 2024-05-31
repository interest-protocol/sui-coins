import { useSignTransactionBlock } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionObjectArgument } from '@mysten/sui.js/transactions';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@wallet-standard/base';
import { Dispatch, SetStateAction } from 'react';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';

export interface AirdropData {
  address: string;
  amount: string;
}

export type TMethod = 'csv' | 'addressList';

export interface IAirdropForm {
  error: boolean;
  amount: number;
  method: TMethod;
  decimals: number;
  token: CoinObject;
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
  txb: TransactionBlock;
  contractPackageId: string;
  tokenType: string;
  coinToSend:
    | {
        kind: 'NestedResult';
        index: number;
        resultIndex: number;
      }
    | TransactionObjectArgument;
  batch: readonly AirdropData[];
  currentAccount: WalletAccount;
  signTransactionBlock: ReturnType<typeof useSignTransactionBlock>;
}

export interface AirdropPreviewButtonProps {
  handleOpenSummaryModal: () => void;
}
