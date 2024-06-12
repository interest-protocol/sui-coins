import { normalizeStructTag } from '@mysten/sui.js/utils';

import { Network } from '@/constants';
import { CoinMetadataWithType } from '@/interface';

import { isSameStructTag } from '../address';
import coinMetadataJsonRaw from './coin-metadata.json';

const coinMetadataJson = coinMetadataJsonRaw as unknown as Record<
  Network,
  Record<string, CoinMetadataWithType>
>;

interface FetchCoinMetadataBaseArgs {
  network: Network;
}

interface FetchCoinMetadataSingleTypeArg extends FetchCoinMetadataBaseArgs {
  type: string;
}

interface FetchCoinMetadataMultipleTypeArg extends FetchCoinMetadataBaseArgs {
  types: ReadonlyArray<string>;
}

interface FetchCoinMetadata {
  (args: FetchCoinMetadataSingleTypeArg): Promise<CoinMetadataWithType>;
  (
    args: FetchCoinMetadataMultipleTypeArg
  ): Promise<ReadonlyArray<CoinMetadataWithType>>;
}

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    const localMetadata =
      coinMetadataJson[args.network][normalizeStructTag(args.type as string)];

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

  const localMetadatas = uniqueTypes.map(
    (type) => coinMetadataJson[args.network][normalizeStructTag(type)]
  );

  const missingTypes = uniqueTypes.filter(
    (type) => !localMetadatas.some((data) => isSameStructTag(type, data.type))
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
