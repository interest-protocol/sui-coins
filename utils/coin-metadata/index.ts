import { normalizeStructTag } from '@mysten/sui.js/utils';

import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

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

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    const localMetadata =
      coinMetadataMap[args.network][normalizeStructTag(args.type as string)];

    if (localMetadata) return localMetadata;

    return await fetch('/api/auth/v1/coin-metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((res) => res.json());
  }

  const uniqueTypes = Array.from(new Set(args.types));

  const localMetadatas = uniqueTypes.reduce((acc, type) => {
    const metadata = coinMetadataMap[args.network][normalizeStructTag(type)];
    if (!metadata) return acc;
    return [...acc, metadata];
  }, [] as ReadonlyArray<CoinMetadataWithType>);

  const missingTypes = uniqueTypes.filter(
    (type) => !coinMetadataMap[args.network][normalizeStructTag(type)]
  );

  if (!missingTypes.length) return localMetadatas;

  const missingMetadatas = await fetch('/api/auth/v1/coin-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coinsType: missingTypes, network: args.network }),
  }).then((res) => res.json());

  return [...missingMetadatas, ...localMetadatas];
};
