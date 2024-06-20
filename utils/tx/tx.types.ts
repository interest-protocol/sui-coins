import { useSignTransaction } from '@mysten/dapp-kit';
import {
  SuiClient,
  SuiTransactionBlockResponseOptions,
} from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { WalletAccount } from '@wallet-standard/base';

export interface SignAndExecuteArgs {
  suiClient: SuiClient;
  currentAccount: WalletAccount;
  tx: Transaction;
  signTransaction: ReturnType<typeof useSignTransaction>;
  options?: SuiTransactionBlockResponseOptions;
}

export interface WaitForTxArgs {
  suiClient: SuiClient;
  digest: string;
  timeout?: number;
  pollInterval?: number;
}
