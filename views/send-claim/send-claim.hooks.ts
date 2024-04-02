import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

import { ZkSendLinkWithUrl } from './send-claim.types';

export const useClaimLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    { url, link }: ZkSendLinkWithUrl,
    id: string,
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

    fetch(`/api/v1/zksend?network=${network}&id=${id}&link=${url}`, {
      method: 'DELETE',
    });

    onSuccess(tx);
  };
};
