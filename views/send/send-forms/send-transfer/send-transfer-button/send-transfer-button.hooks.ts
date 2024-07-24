import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';
import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { FixedPointMath } from '@/lib';
import {
  isSui,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { ObjectField } from '../send-transfer.types';

const useSendAssets = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    objects: ReadonlyArray<ObjectField>,
    recipient: string,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');
    if (!recipient) throw new Error('There is not recipient address');

    const tx = new Transaction();

    const itemsToSend = objects.map((object) => {
      if (!isCoinObject(object as ObjectData)) return object.objectId;

      const amount = BigInt(
        FixedPointMath.toBigNumber(
          object.value!,
          Number(object.display!.decimals!)
        )
          .decimalPlaces(0)
          .toString()
      );

      if (isSui(object.display!.type)) return tx.splitCoins(tx.gas, [amount]);

      const objectWithEnoughBalance = (
        object.display! as CoinObject
      ).objects.find(({ balance }) => BigInt(balance) <= amount);

      if (!objectWithEnoughBalance)
        throw new Error('You must merge your coins');

      return tx.splitCoins(tx.object(objectWithEnoughBalance.coinObjectId), [
        amount,
      ]);
    });

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
