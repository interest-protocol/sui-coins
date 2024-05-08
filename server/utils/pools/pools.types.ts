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
