import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';
import { CoinObject } from '@/components/web3-manager/coins-manager/web3-manager.types';

import { useCoins } from '../use-coins';
import { useNFTMetadata } from '../use-nft-metadata';
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

  const {
    nfts,
    nftsMap,
    loading: nftsLoading,
    error: nftsError,
  } = useNFTMetadata();

  const compiledCoinsObjects = getCoinsObjects(coinsObjects, coins);

  const objects = [...compiledCoinsObjects, ...ownedNfts, ...otherObjects];

  const error = nftsError || coinsError || objectsError;
  const loading = nftsLoading || coinsLoading || objectsLoading;

  return {
    nfts,
    coins,
    error,
    loading,
    nftsMap,
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
