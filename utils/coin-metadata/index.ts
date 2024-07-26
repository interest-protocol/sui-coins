import { CoinMetadataWithType } from '@/interface';

import {
  FetchCoinMetadata,
  FetchCoinMetadataMultipleTypeArg,
  FetchCoinMetadataSingleTypeArg,
} from './coin-metadata.types';

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    if (metadatas[args.type]) return metadatas[args.type];

    return await fetch('/api/auth/v1/coin-metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    })
      .then((res) => res.json())
      .then((data) => {
        metadatas[args.type] = data;
        return data;
      });
  }

  const uniqueTypes = Array.from(new Set(args.types));

  if (uniqueTypes.every((type) => metadatas[type]))
    return uniqueTypes.map((type) => metadatas[type]);

  const coinsToFetch = uniqueTypes.filter((type) => !metadatas[type]);

  return await fetch('/api/auth/v1/coin-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coinsType: coinsToFetch, network: args.network }),
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
        (metadata: CoinMetadataWithType) =>
          (metadatas[metadata.type] = metadata)
      );

      return uniqueTypes.map((type) => metadatas[type]);
    });
};
