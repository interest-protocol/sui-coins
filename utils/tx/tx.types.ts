import { useSignTransactionBlock } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui.js/client';
import { SuiTransactionBlockResponseOptions } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@wallet-standard/base';

export interface SignAndExecuteArgs {
  suiClient: SuiClient;
  currentAccount: WalletAccount;
  txb: TransactionBlock;
  signTransactionBlock: ReturnType<typeof useSignTransactionBlock>;
  options?: SuiTransactionBlockResponseOptions;
}
