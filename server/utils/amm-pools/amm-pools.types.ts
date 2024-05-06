import { SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';

export interface SavePoolArgs {
  client: SuiClient;
  network: Network;
  poolId: string;
}

export interface GetAllPoolsArgs {
  client: SuiClient;
  network: Network;
  pageNumber: number;
}

export interface GetPoolsByCoinTypes {
  client: SuiClient;
  network: Network;
  coinInType: string;
  coinOutType: string;
}
