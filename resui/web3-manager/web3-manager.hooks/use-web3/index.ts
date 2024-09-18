import { useMemo } from 'react';

import { ObjectData } from '../../all-objects-manager/all-objects.types';
import { CoinObject } from '../../coins-manager/coins-manager.types';
import { useCoins } from '../use-coins';
import { useObjects } from '../use-objects';

const getCoinsObjects = (
  coinsObjects?: ReadonlyArray<ObjectData>,
  coins?: ReadonlyArray<CoinObject>
) =>
  coins?.map((coin) => ({
    ...(coinsObjects ?? [])!.find(({ type }) => type.includes(coin.type))!,
    display: coin,
  })) ?? [];

export const useWeb3 = () => {
  const {
    delay,
    coins,
    coinsMap,
    error: coinsError,
    loading: coinsLoading,
    refresh: refreshCoins,
    updateDelay: updateDelayCoins,
  } = useCoins();

  const {
    ownedNfts,
    otherObjects,
    coinsObjects,
    error: objectsError,
    loading: objectsLoading,
    refresh: refreshObjects,
    updateDelay: updateDelayObjects,
  } = useObjects();

  const compiledCoinsObjects = useMemo(
    () => getCoinsObjects(coinsObjects, coins),
    [coinsObjects, coins]
  );

  const objects = useMemo(
    () => [...compiledCoinsObjects, ...ownedNfts, ...otherObjects],
    [ownedNfts, otherObjects, compiledCoinsObjects]
  );

  const error = coinsError || objectsError;
  const loading = coinsLoading || objectsLoading;

  return {
    coins,
    error,
    delay,
    loading,
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects: compiledCoinsObjects,
    mutate: () => {
      refreshCoins();
      refreshObjects();
    },
    setDelay: (interval: number | undefined) => {
      updateDelayCoins(interval);
      updateDelayObjects(interval);
    },
  };
};
