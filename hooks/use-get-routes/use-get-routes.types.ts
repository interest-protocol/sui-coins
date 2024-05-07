import { SuiClient } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

import { Network } from '@/constants';
import { AmmPool } from '@/interface';
import {
  CoinPath,
  Dex,
  PoolObjectIdPath,
  Routes,
} from '@/utils/router/router.types';

export interface UseGetRoutesArgs {
  coinInType: string;
  coinOutType: string;
  amount: string;
  isAmountIn: boolean;
}

export type PoolsMap = Record<string, AmmPool>;

export interface CacheValue {
  dex: Dex;
  poolsMap: PoolsMap;
}

export interface FindAmountArgs {
  client: SuiClient;
  routes: Routes;
  amount: string;
  isAmountIn: boolean;
  poolsMap: PoolsMap;
  network: Network;
}

export type RouteWithAmount = [CoinPath, PoolObjectIdPath, BigNumber];
