import { CoinMetadata } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: string;
  decimals: number;
  symbol: string;
}

export type LocalTokenMetadataRecord = Record<string, CoinData>;

export enum PoolTypeEnum {
  'clamm' = 'clamm',
  'amm' = 'amm',
}

export interface LocalCoinMetadata {
  decimals: number;
  symbol: string;
  type: string;
}

export interface PoolPageProps {
  objectId: string;
  stateId: string;
}

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface AmmPoolFees<T> {
  adminFee: T;
  // 18 decimals
  feeIn: T;
  feeOut: T;
}

export interface AmmPoolCoinTypes {
  coinX: string;
  coinY: string;
  lpCoin: string;
}

interface AmmPoolRaw<T> {
  poolId: string;
  stateId: string;
  // we do not use
  adminBalanceX: T;
  adminBalanceY: T;
  balanceX: T;
  balanceY: T;
  decimalsX: number;
  decimalsY: number;
  fees: AmmPoolFees<T>;
  // 9 Decimals
  lpCoinSupply: T;
  type: string;
  coinTypes: AmmPoolCoinTypes;
  poolType: PoolTypeEnum;
  isVolatile: boolean;
}

export type AmmServerPool = AmmPoolRaw<string>;

export type AmmPool = AmmPoolRaw<BigNumber>;

export interface Token {
  name?: string;
  symbol: string;
  decimals: number;
  type: `0x${string}`;
}
