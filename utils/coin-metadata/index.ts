import { normalizeStructTag } from '@mysten/sui/utils';

import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

import { isSameStructTag } from '../address';
import coinMetadataJsonRaw from './coin-metadata.json';
import {
  FetchCoinMetadata,
  FetchCoinMetadataMultipleTypeArg,
  FetchCoinMetadataSingleTypeArg,
} from './coin-metadata.types';

const coinMetadataMap = coinMetadataJsonRaw as unknown as Record<
  Network,
  Record<string, CoinMetadataWithType>
>;

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    const localMetadata =
      coinMetadataMap[args.network][normalizeStructTag(args.type as string)];

    if (localMetadata) return localMetadata;

    if (metadatas[args.type]) return metadatas[args.type];

    return await fetch(
      `https://api.interestlabs.io/v1/coins/${
        Network.MAINNET === args.network ? 'mainnet' : 'testnet'
      }/metadatas/${encodeURI(args.type)}`,
      {
        headers: {
          network: 'sui',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        metadatas[args.type] = data;
        return data;
      })
      .catch();
  }

  const uniqueTypes = Array.from(new Set(args.types));

  const cachedMetadatas = uniqueTypes.reduce((acc, type) => {
    const metadata =
      coinMetadataMap[args.network][normalizeStructTag(type)] ??
      metadatas[type];
    if (!metadata) return acc;
    return [...acc, metadata];
  }, [] as ReadonlyArray<CoinMetadataWithType>);

  const missingTypes = uniqueTypes.filter(
    (type) => !cachedMetadatas.some((meta) => isSameStructTag(meta.type, type))
  );

  if (!missingTypes.length) return cachedMetadatas;

  const missingMetadatas = await fetch(
    `https://api.interestlabs.io/v1/coins/${
      Network.MAINNET === args.network ? 'mainnet' : 'testnet'
    }/metadatas?coinTypes=${missingTypes}`,
    {
      headers: {
        network: 'sui',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        (metadata: CoinMetadataWithType) =>
          (metadatas[metadata.type] = metadata)
      );

      return data;
    });

  return [...cachedMetadatas, ...missingMetadatas];
};
