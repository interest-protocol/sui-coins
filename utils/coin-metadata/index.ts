import { normalizeStructTag } from '@mysten/sui/utils';

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

const metadatas: Record<string, CoinMetadataWithType> = {};

export const fetchCoinMetadata: FetchCoinMetadata = async (args) => {
  if (isSingleType(args)) {
    const localMetadata =
      coinMetadataMap[args.network][normalizeStructTag(args.type as string)];

    if (localMetadata) return localMetadata;

    if (metadatas[args.type]) return metadatas[args.type];

    if (args.network === Network.MAINNET)
      return await fetch(
        'https://sui-coin-purse-production.up.railway.app/api/fetch-coin',
        {
          method: 'POST',
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ coinType: args.type }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          metadatas[args.type] = data;
          return data;
        });

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

  const cachedMetadatas = uniqueTypes.reduce((acc, type) => {
    const metadata =
      coinMetadataMap[args.network][normalizeStructTag(type)] ??
      metadatas[type];
    if (!metadata) return acc;
    return [...acc, metadata];
  }, [] as ReadonlyArray<CoinMetadataWithType>);

  const missingTypes = uniqueTypes.filter(
    (type) => !coinMetadataMap[args.network][normalizeStructTag(type)]
  );

  if (!missingTypes.length) return cachedMetadatas;

  let missingMetadatas = [];

  if (args.network === Network.MAINNET)
    missingMetadatas = await fetch(
      'https://sui-coin-purse-production.up.railway.app/api/fetch-coins',
      {
        method: 'POST',
        headers: { accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({ coinTypes: args.types }),
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
  else
    missingMetadatas = await fetch('/api/auth/v1/coin-metadata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coinsType: missingTypes, network: args.network }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach(
          (metadata: CoinMetadataWithType) =>
            (metadatas[metadata.type] = metadata)
        );

        return data;
      });

  return [...missingMetadatas, ...cachedMetadatas];
};
