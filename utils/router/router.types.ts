export interface Dex {
  [poolObjectId: string]: string[]; // Dictionary to store neighboring coins
}

export type CoinPath = string[];
export type PoolObjectIdPath = string[];

export type Route = [CoinPath, PoolObjectIdPath];

export type Routes = Route[];
