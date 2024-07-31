import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

import { TimedSuiTransactionBlockResponse } from '@/interface';
import { signAndExecute, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { ObjectField } from '../send-transfer.types';

const useSendAssets = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    objects: ReadonlyArray<ObjectField>,
    recipient: string,
    onSuccess: (tx: TimedSuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');
    if (!recipient) throw new Error('There is not recipient address');

    const tx = new Transaction();

    const itemsToSend = objects.map((object) => object.objectId);

    tx.transferObjects(itemsToSend, tx.pure.address(recipient));

    const txResult = await signAndExecute({
      tx,
      suiClient,
      currentAccount,
      signTransaction,
    });

    await waitForTx({ suiClient, digest: txResult.digest });

    throwTXIfNotSuccessful(txResult);

    onSuccess(txResult);
  };
};

export default useSendAssets;
