import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
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
import { ZERO_BIG_NUMBER } from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import {
  IncineratorForm,
  IncineratorTabEnum,
  ObjectField,
} from './incinerator.types';

export const useIncineratorManager = () => {
  const currentAccount = useCurrentAccount();
  const { control, setValue } = useFormContext<IncineratorForm>();
  const {
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects,
    isFetchingCoinBalances,
  } = useWeb3();

  const tab = useWatch({ control: control, name: 'tab' });
  const search = useWatch({ control, name: 'search' });
  const formObjects = useWatch({ control, name: 'objects' });
  const reset = useWatch({ control: control, name: 'reset' });
  const checked = useWatch({ control: control, name: 'checked' });

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

  const updateBalances = () => {
    setValue(
      'objects',
      formObjects.map((object: ObjectField): ObjectField => {
        if (!object.display || !object.display.balance) return object;

        const coin = coinsMap[(object.display as CoinObject).type] ?? {
          balance: ZERO_BIG_NUMBER,
          decimals: 0,
        };

        return {
          ...object,
          display: {
            ...object.display,
            balance: coin.balance,
          } as CoinObjectData['display'],
          ...(!object.isEditing && {
            value: coin.balance.lt(
              FixedPointMath.toBigNumber(object.value, coin.decimals)
            )
              ? String(FixedPointMath.toNumber(coin.balance, coin.decimals))
              : object.value,
          }),
        };
      })
    );
  };

  useEffect(() => {
    if (!isFetchingCoinBalances && currentAccount && !formObjects.length)
      updateAssets(checked);
  }, [isFetchingCoinBalances]);

  useEffect(() => {
    updateAssets(checked);
  }, [checked, tab, currentAccount, search]);

  useEffect(() => {
    if (objects.length !== formObjects.length) {
      updateAssets(checked);
      return;
    }
    if (coinsMap) updateBalances();
  }, [objects, coinsMap]);

  return;
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

    txb.transferObjects(objectsToTransfer, txb.pure.address('0x0'));

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
