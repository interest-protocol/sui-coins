import { Network } from '@/constants';
import { CoinMetadataModel } from '@/server/model/coin-metadata';

import { isSameStructTag } from '../address';
import coinMetadataJson from './coin-metadata.json';

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
  (args: FetchCoinMetadataSingleTypeArg): Promise<CoinMetadataModel>;
  (
    args: FetchCoinMetadataMultipleTypeArg
  ): Promise<ReadonlyArray<CoinMetadataModel>>;
}

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    const localMetadata = coinMetadataJson[args.network].find(({ type }) =>
      isSameStructTag(type, args.type)
    );

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

  const localMetadatas = coinMetadataJson[args.network].filter((data) =>
    uniqueTypes.some((type) => isSameStructTag(type, data.type))
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
