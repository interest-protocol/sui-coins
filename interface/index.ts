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
}

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface AmmPoolFees {
  adminFee: BigNumber;
  // 18 decimals
  feeIn: BigNumber;
  feeOut: BigNumber;
}

export interface AmmPoolCoinTypes {
  coinX: string;
  coinY: string;
  lpCoin: string;
}

export interface AmmPool {
  poolId: string;
  stateId: string;
  adminBalanceX: BigNumber;
  adminBalanceY: BigNumber;
  balanceX: BigNumber;
  balanceY: BigNumber;
  decimalsX: number;
  decimalsY: number;
  fees: AmmPoolFees;
  // 9 Decimals
  lpCoinSupply: BigNumber;
  type: string;
  coinTypes: AmmPoolCoinTypes;
  poolType: PoolTypeEnum;
  isVolatile: boolean;
}
