import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionObjectArgument } from '@mysten/sui.js/transactions';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import BigNumber from 'bignumber.js';

import {
  CoinObjectData,
  ObjectData,
} from '@/components/web3-manager/all-objects-manager/all-objects.types';
import { FixedPointMath } from '@/lib';
import { signAndExecute, throwTXIfNotSuccessful } from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { ObjectField } from './incinerator.types';

export const useBurn = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const txb = new TransactionBlock();

    const objectsToTransfer = objects.map((object) => {
      if (!isCoinObject(object as ObjectData)) return object.objectId;

      const objectBalance = BigNumber(object.display?.balance || '0');

      if (objectBalance.isZero()) {
        txb.moveCall({
          target: '0x2::coin::destroy_zero',
          arguments: [txb.object(object.objectId)],
          typeArguments: [object.display?.type || ''],
        });
        return null;
      }

      const amount = FixedPointMath.toBigNumber(
        object.value,
        Number(object.display!.decimals!)
      );

      if (amount.isZero() && !objectBalance.isZero()) return null;

      const [firstCoin, ...otherCoins] = (object as CoinObjectData).display
        .objects;

      const firstCoinObject = txb.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        txb.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      if (amount.gte(object.display!.balance)) return firstCoinObject;

      const [splittedCoin] = txb.splitCoins(firstCoinObject, [
        txb.pure(amount.decimalPlaces(0).toString()),
      ]);

      return splittedCoin;
    });

    const toTransfer = objectsToTransfer.filter((x) => x != null) as
      | TransactionObjectArgument[]
      | string[];

    if (toTransfer.length)
      txb.transferObjects(toTransfer, txb.pure.address('0x0'));

    const tx = await signAndExecute({
      txb,
      suiClient,
      currentAccount,
      signTransactionBlock,
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
