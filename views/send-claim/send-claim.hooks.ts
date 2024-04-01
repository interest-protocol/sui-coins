import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { ZkSendLink } from '@mysten/zksend';

import { throwTXIfNotSuccessful } from '@/utils';

export const useClaimLink = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink | undefined,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount || !link || !link.keypair) return;

    const transactionBlock = link.createClaimTransaction(
      currentAccount.address
    );

    transactionBlock.setGasOwner(currentAccount.address);

    const { signature, transactionBlockBytes } =
      await signTransactionBlock.mutateAsync({
        transactionBlock,
      });

    const { signature: sponsorSignature } =
      await link.keypair.signTransactionBlock(
        await TransactionBlock.from(transactionBlockBytes).build()
      );

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature: [signature, sponsorSignature],
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
