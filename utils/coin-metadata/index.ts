import {
  FetchCoinMetadata,
  FetchCoinMetadataMultipleTypeArg,
  FetchCoinMetadataSingleTypeArg,
} from './coin-metadata.types';

const isSingleType = (
  args: FetchCoinMetadataSingleTypeArg | FetchCoinMetadataMultipleTypeArg
): args is FetchCoinMetadataSingleTypeArg =>
  !!(args as FetchCoinMetadataSingleTypeArg).type;

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args))
    return await fetch('/api/auth/v1/coin-metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    }).then((res) => res.json());

  const uniqueTypes = Array.from(new Set(args.types));

  return await fetch('/api/auth/v1/coin-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coinsType: uniqueTypes, network: args.network }),
  }).then((res) => res.json());
};
