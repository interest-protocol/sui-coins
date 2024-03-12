import {
  isAfSuiRouterPoolObject,
  isRouterSynchronousSerializablePool,
  PoolObject,
  RouterSerializablePool,
} from 'aftermath-ts-sdk';
import { isBaySwapPoolObject } from 'aftermath-ts-sdk/dist/packages/external/baySwap/baySwapTypes';
import { isBlueMovePoolObject } from 'aftermath-ts-sdk/dist/packages/external/blueMove/blueMoveTypes';
import { isInterestPoolObject } from 'aftermath-ts-sdk/dist/packages/external/interest/interestTypes';
import { isKriyaPoolObject } from 'aftermath-ts-sdk/dist/packages/external/kriya/kriyaTypes';
import { isSuiswapPoolObject } from 'aftermath-ts-sdk/dist/packages/external/suiswap/suiswapTypes';

export const getPoolType = (pool: RouterSerializablePool) => {
  if (isRouterSynchronousSerializablePool(pool)) {
    if (isInterestPoolObject(pool)) return pool.objectType;
    if (isKriyaPoolObject(pool)) return pool.objectType;
    if (isBaySwapPoolObject(pool)) return pool.objectType;
    if (isSuiswapPoolObject(pool)) return pool.objectType;
    if (isBlueMovePoolObject(pool)) return pool.objectType;
    if (isAfSuiRouterPoolObject(pool)) return pool.objectType;
    return (pool as PoolObject).lpCoinType;
  }

  return '';
};
