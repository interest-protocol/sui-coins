import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';

import { IncineratorForm, IncineratorTabEnum } from './incinerator.types';
import { objectDataToObjectField } from './incinerator.utils';

const IncineratorManager: FC = () => {
  const network = useNetwork();
  const currentAccount = useCurrentAccount();
  const { control, setValue } = useFormContext<IncineratorForm>();
  const {
    error,
    mutate,
    objects,
    loading,
    coinsMap,
    setDelay,
    ownedNfts,
    otherObjects,
    coinsObjects,
  } = useWeb3();

  const tab = useWatch({ control, name: 'tab' });
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

    setDelay(undefined);

    if (loading) return;

    setValue('empty', !displayObjects[tab].length);

    setValue(
      'objects',
      objectDataToObjectField(displayObjects[tab], coinsMap, checked)
    );
  };

  const updateChecked = () =>
    formObjects.map((_, index) => setValue(`objects.${index}.active`, checked));

  useEffect(() => {
    if (displayObjects[tab].length) updateChecked();
  }, [checked]);

  useEffect(() => {
    if (!reset && !error && !loading) updateAssets();
  }, [tab, search]);

  useEffect(() => {
    mutate();
  }, [currentAccount?.address]);

  useEffect(() => {
    mutate();
    setValue('reset', true);
    setValue('empty', true);
  }, [network]);

  useEffect(() => {
    if (!loading && !error) {
      updateAssets();
    }
  }, [objects, loading]);

  return null;
};

export default IncineratorManager;
