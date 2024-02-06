import { bcs } from '@mysten/sui.js/bcs';
import {
  TransactionBlock,
  TransactionResult,
} from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import { pathOr } from 'ramda';

import { OBJECT_RECORD } from '@/constants';
import { DEX_BASE_COINS, REGISTRY_POOLS } from '@/constants/dex';
import { RegistryPool } from '@/interface';
import { getReturnValuesFromInspectResults } from '@/utils';
import { SwapPath } from '@/views/swap/swap.types';

import { FindSwapPathArgs, QuoteAmountArgs } from './swap-manager.types';

export const quoteAmountOut = async ({
  client,
  amount,
  network,
  swapPath,
}: QuoteAmountArgs) => {
  const txb = new TransactionBlock();

  let nextAmountIn: TransactionResult | null = null;

  swapPath.forEach(({ coinIn, coinOut, lpCoin }, index) => {
    const pool = REGISTRY_POOLS[network][coinIn][coinOut].poolId;

    nextAmountIn = txb.moveCall({
      target: `${OBJECT_RECORD[network].DEX_PACKAGE_ID}::quote::amount_out`,
      typeArguments: [coinIn, coinOut, lpCoin],
      arguments: [
        txb.object(pool),
        index === 0 ? txb.pure(amount) : nextAmountIn!,
      ],
    });
  });

  const response = await client.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: normalizeSuiAddress('0x0'),
  });

  if (response.effects.status.status === 'failure') return '0';

  const data = getReturnValuesFromInspectResults(response);

  if (!data || !data.length) return '0';

  const result = data[0];

  return bcs.de(result[1], Uint8Array.from(result[0])) as string;
};

export const quoteAmountIn = async ({
  client,
  amount,
  network,
  swapPath,
}: QuoteAmountArgs) => {
  const txb = new TransactionBlock();

  let nextAmountOut: TransactionResult | null = null;

  swapPath.forEach(({ coinIn, coinOut, lpCoin }, index) => {
    const pool = REGISTRY_POOLS[network][coinIn][coinOut].poolId;

    nextAmountOut = txb.moveCall({
      target: `${OBJECT_RECORD[network].DEX_PACKAGE_ID}::quote::amount_in`,
      typeArguments: [coinIn, coinOut, lpCoin],
      arguments: [
        txb.object(pool),
        index === 0 ? txb.pure(amount) : nextAmountOut!,
      ],
    });
  });

  const response = await client.devInspectTransactionBlock({
    transactionBlock: txb,
    sender: normalizeSuiAddress('0x0'),
  });

  if (response.effects.status.status === 'failure') return '0';

  const data = getReturnValuesFromInspectResults(response);

  if (!data || !data.length) return '0';

  const result = data[0];

  return bcs.de(result[1], Uint8Array.from(result[0])) as string;
};

export const findSwapPaths = ({
  network,
  coinInType,
  coinOutType,
}: FindSwapPathArgs): ReadonlyArray<SwapPath> => {
  const pool = pathOr<null | RegistryPool>(
    null,
    [coinInType, coinOutType],
    REGISTRY_POOLS
  );

  // MOV -> ETH
  if (pool) {
    return [
      [
        {
          coinIn: coinInType,
          coinOut: coinOutType,
          lpCoin: pool.lpCoinType,
        },
      ],
    ];
  }

  const paths = [] as Array<SwapPath>;

  for (const baseCoin of DEX_BASE_COINS[network]) {
    const firstPool = pathOr<null | RegistryPool>(
      null,
      [coinInType, baseCoin],
      REGISTRY_POOLS
    );

    if (firstPool) {
      const secondPool = pathOr<null | RegistryPool>(
        null,
        [baseCoin, coinOutType],
        REGISTRY_POOLS
      );

      if (secondPool)
        paths.push([
          {
            coinIn: coinInType,
            coinOut: baseCoin,
            lpCoin: firstPool.lpCoinType,
          },
          {
            coinIn: baseCoin,
            coinOut: coinOutType,
            lpCoin: secondPool.lpCoinType,
          },
        ]);
    }
  }

  return paths;
};
