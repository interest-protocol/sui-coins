import { SuiClient } from '@mysten/sui.js/client';
import { FilterQuery } from 'mongoose';

import { Network } from '@/constants';

export interface SavePoolArgs {
  client: SuiClient;
  network: Network;
  poolId: string;
}

export interface GetPoolsArgsWithFindQuery {
  page: number;
  network: Network;
  findQuery: FilterQuery<any>;
}

export interface GetPoolsByCoinTypes {
  client: SuiClient;
  network: Network;
  coinInType: string;
  coinOutType: string;
}

export interface GetPoolsByLpCoins {
  client: SuiClient;
  network: Network;
  lpCoins: readonly string[];
}
