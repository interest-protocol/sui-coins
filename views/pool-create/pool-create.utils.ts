import {
  DevInspectResults,
  OwnedObjectRef,
  SuiClient,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { devInspectAndGetReturnValues } from '@polymedia/suits';
import { pathOr } from 'ramda';
import invariant from 'tiny-invariant';

import { AMM_CURVES, Network, OBJECTS, PACKAGES } from '@/constants';
import { Quest } from '@/server/model/quest';

import { ExtractedCoinData, Token } from './pool-create.types';

export const isPoolsCoinsOrdered = async (
  tokens: ReadonlyArray<Token>,
  movementClient: SuiClient,
  network: Network
) => {
  invariant(tokens && tokens.length, 'You must select at least 2 coins');

  const txb = new TransactionBlock();

  const [coinX, coinY] = tokens;

  invariant(coinX.type && coinY.type, 'Coin types not found');

  txb.moveCall({
    typeArguments: [coinX.type, coinY.type],
    target: `${PACKAGES[network].DEX}::utils::are_coins_ordered`,
  });

  const result = await devInspectAndGetReturnValues(
    movementClient as any,
    txb as any
  );

  return result[0][0] as boolean;
};

export const doesPoolExists = async (
  tokens: ReadonlyArray<Token> | undefined,
  isStable: boolean | undefined,
  movementClient: SuiClient,
  network: Network
) => {
  const objects = OBJECTS[network];
  const packages = PACKAGES[network];
  const ammCurves = AMM_CURVES[network];

  invariant(tokens && tokens.length, 'You must select at least 2 coins');

  const [coinX, coinY] = tokens;
  invariant(coinX.type && coinY.type, 'Coin types not found');

  const isOrdered = await isPoolsCoinsOrdered(tokens, movementClient, network);

  const txb = new TransactionBlock();

  const curve = isStable ? ammCurves.STABLE : ammCurves.VOLATILE;

  const typeArguments = isOrdered
    ? [curve, coinX.type, coinY.type]
    : [curve, coinY.type, coinX.type];

  txb.moveCall({
    target: `${packages.DEX}::interest_protocol_amm::exists_`,
    typeArguments,
    arguments: [txb.object(objects.REGISTRY)],
  });

  const result2 = await devInspectAndGetReturnValues(
    movementClient as any,
    txb as any
  );

  return result2[0][0] as boolean;
};

const getCoinType = (x: string) =>
  x.split('0x2::coin::CoinMetadata<')[1].slice(0, -1);

export const extractCoinDataFromTx = async (
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
        `${PACKAGES[network].DEX}::interest_protocol_amm::InterestPool`
  );

  return poolData?.data?.objectId ?? '';
};

export const logCreatePool = (
  address: string,
  tokenA: Token,
  tokenB: Token,
  network: Network,
  txDigest: string
) => {
  fetch(`/api/auth/v1/log-quest?network=${network}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      address,
      txDigest,
      kind: 'createPool',
      data: {
        coinA: {
          type: tokenA.type,
          amount: tokenA.value,
          symbol: tokenA.symbol,
        },
        coinB: {
          type: tokenB.type,
          amount: tokenB.value,
          symbol: tokenB.symbol,
        },
      },
    } as Omit<Quest, 'timestamp'>),
  });
};
