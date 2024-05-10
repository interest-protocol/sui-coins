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
    coinsMap,
    coins,
    loading: coinsLoading,
    error: coinsError,
  } = useCoins();

  const {
    ownedNfts,
    otherObjects,
    coinsObjects,
    loading: objectsLoading,
    error: objectsError,
  } = useObjects();

  const {
    nfts,
    nftsMap,
    loading: nftsLoading,
    error: nftsError,
  } = useNFTMetadata();

  const compiledCoinsObjects = getCoinsObjects(coinsObjects, coins);

  const objects = [...compiledCoinsObjects, ...ownedNfts, ...otherObjects];

  return {
    nfts,
    coins,
    nftsMap,
    objects,
    coinsMap,
    ownedNfts,
    otherObjects,
    coinsObjects: compiledCoinsObjects,
    error: nftsError || coinsError || objectsError,
    loading: nftsLoading || coinsLoading || objectsLoading,
  };
};
