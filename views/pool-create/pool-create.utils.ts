import {
  DevInspectResults,
  OwnedObjectRef,
  SuiClient,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { pathOr } from 'ramda';

import { Network } from '@/constants';
import { CLAMM_PACKAGE_ADDRESSES } from '@/constants/clamm';

import { ExtractedCoinData } from './pool-create.types';

const getCoinType = (x: string) =>
  x.split('0x2::coin::CoinMetadata<')[1].slice(0, -1);

export const extractCoinData = async (
  tx: SuiTransactionBlockResponse | DevInspectResults,
  client: SuiClient
) => {
  // return if the tx hasn't succeed
  if (tx.effects?.status?.status !== 'success')
    throw new Error('Creating a new stable pool failed');

  // get all created objects IDs
  const createdObjectIds = tx.effects.created!.map(
    (item: OwnedObjectRef) => item.reference.objectId
  );

  // fetch objects data
  const objects = await client.multiGetObjects({
    ids: createdObjectIds,
    options: { showContent: true, showType: true, showOwner: true },
  });

  return objects.reduce(
    (acc, elem) => {
      if (elem.data?.content?.dataType === 'moveObject') {
        const type = elem.data.content.type;

        const isCoinMetadata = type.startsWith('0x2::coin::CoinMetadata<');
        const isCoin = type.startsWith('0x2::coin::Coin<');
        const isTreasuryCap = type.startsWith('0x2::coin::TreasuryCap<');

        if (isCoinMetadata)
          return {
            ...acc,
            coinMetadata: pathOr('', ['id', 'id'], elem.data.content.fields),
            coinType: getCoinType(elem.data.content.type),
          };
        if (isCoin)
          return {
            ...acc,
            coinObjectId: pathOr('', ['id', 'id'], elem.data.content.fields),
          };
        if (isTreasuryCap)
          return {
            ...acc,
            treasuryCap: pathOr('', ['id', 'id'], elem.data.content.fields),
          };

        return acc;
      }

      return acc;
    },
    {
      treasuryCap: '',
      coinMetadata: '',
      coinObjectId: '',
      coinType: '',
    } as ExtractedCoinData
  );
};

export const extractPoolDataFromTx = async (
  tx: SuiTransactionBlockResponse | DevInspectResults,
  client: SuiClient,
  network: Network
) => {
  // return if the tx hasn't succeed
  if (tx.effects?.status?.status !== 'success')
    throw new Error('Creating a new stable pool failed');

  // get all created objects IDs
  const createdObjectIds = tx.effects.created!.map(
    (item: OwnedObjectRef) => item.reference.objectId
  );

  // fetch objects data
  const objects = await client.multiGetObjects({
    ids: createdObjectIds,
    options: { showContent: true, showType: true, showOwner: true },
  });

  const poolData = objects.find(
    (elem) =>
      elem.data?.content?.dataType === 'moveObject' &&
      (elem?.data?.content?.type as string) ===
        `${CLAMM_PACKAGE_ADDRESSES[network]}::interest_pool::InterestPool`
  );

  return poolData?.data?.objectId ?? '';
};
