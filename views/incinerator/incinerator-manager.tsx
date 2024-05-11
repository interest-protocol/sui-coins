import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinObject } from '@/components/web3-manager/coins-manager/web3-manager.types';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import { getKindFromObjectData } from '@/utils';

import {
  IncineratorForm,
  IncineratorTabEnum,
  ObjectField,
} from './incinerator.types';

const IncineratorManager: FC = () => {
  const currentAccount = useCurrentAccount();
  const { control, setValue } = useFormContext<IncineratorForm>();
  const { objects, coinsMap, ownedNfts, otherObjects, coinsObjects, setDelay } =
    useWeb3();

  const tab = useWatch({ control, name: 'tab' });
  const empty = useWatch({ control, name: 'empty' });
  const reset = useWatch({ control, name: 'reset' });
  const search = useWatch({ control, name: 'search' });
  const checked = useWatch({ control, name: 'checked' });
  const formObjects = useWatch({ control, name: 'objects' });

  const displayObjects = {
    [IncineratorTabEnum.All]: objects,
    [IncineratorTabEnum.Coin]: coinsObjects,
    [IncineratorTabEnum.NFT]: ownedNfts,
    [IncineratorTabEnum.Other]: otherObjects,
  };

  const updateAssets = () => {
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
            editable,
            active: checked,
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

  const updateChecked = () =>
    formObjects.map((_, index) => setValue(`objects.${index}.active`, checked));

  useEffect(() => {
    updateChecked();
  }, [checked]);

  useEffect(() => {
    if (displayObjects[tab].every((type) => type)) {
      updateAssets();
    }
  }, [tab, currentAccount, search]);

  useEffect(() => {
    if (displayObjects[tab].every((type) => type)) {
      if (reset) {
        updateAssets();
        return;
      }
      if (formObjects.length !== displayObjects[tab].length) {
        updateAssets();
        setDelay(undefined);
        return;
      }
    }
  }, [coinsMap]);

  useEffect(() => {
    if (!formObjects.length !== empty) setValue('empty', !formObjects.length);
  }, [formObjects]);

  return null;
};

export default IncineratorManager;
