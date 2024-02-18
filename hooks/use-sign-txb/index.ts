import {
  SignedTransactionBlock,
  useSignTransactionBlock,
} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { IdentifierString, WalletAccount } from '@mysten/wallet-standard';

const useSignTxb = () => {
  const signTransactionBlock = useSignTransactionBlock();

  return (args: {
    transactionBlock: TransactionBlock;
    chain?: IdentifierString;
    account?: WalletAccount;
  }): Promise<SignedTransactionBlock> =>
    new Promise((resolve) =>
      signTransactionBlock.mutate(args, { onSuccess: resolve })
    );
};

export default useSignTxb;
