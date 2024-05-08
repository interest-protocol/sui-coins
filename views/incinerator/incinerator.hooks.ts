import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionObjectArgument } from '@mysten/sui.js/transactions';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  CoinObjectData,
  ObjectData,
} from '@/context/all-objects/all-objects.types';
import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  getKindFromObjectData,
  signAndExecute,
  throwTXIfNotSuccessful,
} from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import {
  IncineratorForm,
  IncineratorTabEnum,
  ObjectField,
} from './incinerator.types';

export const useIncineratorManager = () => {
  const currentAccount = useCurrentAccount();
  const { control, setValue, getValues } = useFormContext<IncineratorForm>();
  const {
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects,
    isFetchingCoinBalances,
  } = useWeb3();

  const tab = useWatch({ control, name: 'tab' });
  const reset = useWatch({ control, name: 'reset' });
  const search = useWatch({ control, name: 'search' });
  const checked = useWatch({ control, name: 'checked' });

  const displayObjects = {
    [IncineratorTabEnum.All]: objects,
    [IncineratorTabEnum.Coin]: coinsObjects,
    [IncineratorTabEnum.NFT]: ownedNfts,
    [IncineratorTabEnum.Other]: otherObjects,
  };

  const updateAssets = (active: boolean) => {
    if (reset) setValue('reset', false);

    setValue(
      'objects',
      displayObjects[tab].reduce((acc, object) => {
        if (
          !(
            object.type?.toLowerCase().includes(search.toLowerCase()) ||
            object.display?.symbol
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            object.display?.coinObjectId
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        )
          return acc;

        const coin = coinsMap[(object.display as CoinObject)?.type];
        const editable = coin && coin.balance && !coin.balance.isZero();

        return [
          ...acc,
          {
            ...object,
            active,
            editable,
            isEditing: false,
            index: acc.length,
            kind: getKindFromObjectData(object),
            value: coin
              ? `${FixedPointMath.toNumber(coin.balance, coin.decimals)}`
              : '1',
          },
        ];
      }, [] as ReadonlyArray<ObjectField>)
    );
  };

  useEffect(() => {
    const formObjects = getValues('objects');
    if (!isFetchingCoinBalances && currentAccount && !formObjects.length)
      updateAssets(checked);
  }, [isFetchingCoinBalances]);

  useEffect(() => {
    updateAssets(checked);
  }, [checked, tab, currentAccount, search]);

  useEffect(() => {
    const formObjects = getValues('objects');

    if (objects.length !== formObjects.length) updateAssets(checked);
  }, [objects]);

  useEffect(() => {
    if (reset) updateAssets(checked);
  }, [coinsMap]);

  return { isFetchingCoinBalances, objects: getValues('objects'), reset };
};

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

      if (BigNumber(object.display?.balance || '0').isZero()) {
        txb.moveCall({
          target: '0x2::coin::destroy_zero',
          arguments: [txb.object(object.objectId)],
          typeArguments: [object.display?.type || ''],
        });
        return null;
      }

      const [firstCoin, ...otherCoins] = (object as CoinObjectData).display
        .objects;

      const firstCoinObject = txb.object(firstCoin.coinObjectId);

      if (otherCoins.length)
        txb.mergeCoins(
          firstCoinObject,
          otherCoins.map((coin) => coin.coinObjectId)
        );

      const amount = FixedPointMath.toBigNumber(
        object.value,
        Number(object.display!.decimals!)
      );

      if (amount.eq(object.display!.balance)) return firstCoinObject;

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
