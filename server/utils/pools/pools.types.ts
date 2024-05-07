import { SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';

export interface GetClammPoolsArgs {
  network: Network;
  page: number;
  limit: number;
}

export interface GetClammPoolsByCoinTypesArgs {
  network: Network;
  coinTypes: string[];
}

export interface SavePoolArgs {
  poolId: string;
  network: Network;
}
