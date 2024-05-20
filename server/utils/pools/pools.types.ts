import { FilterQuery } from 'mongoose';

import { Network } from '@/constants';

export interface GetClammPoolsArgs {
  network: Network;
  page: number;
  limit: number;
}

export interface GetClammPoolsArgsWithFindQuery {
  network: Network;
  page: number;
  limit: number;
  findQuery: FilterQuery<any>;
}

export interface GetClammPoolsByCoinTypesArgs {
  network: Network;
  coinTypes: string[];
}

export interface SavePoolArgs {
  poolId: string;
  network: Network;
}
