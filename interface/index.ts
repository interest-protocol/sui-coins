import { CoinMetadata } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

import { TOKEN_SYMBOL } from '@/lib';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  decimals: number;
  type: `0x${string}`;
  symbol: TOKEN_SYMBOL | string;
}

export type LocalTokenMetadataRecord = Record<string, CoinData>;

export type DexMarket = Record<string, Record<string, string>>;

export interface FormattedNumber {
  unit: string;
  value: number;
  toString: (unitSeparator?: string) => string;
}

export interface RegistryPool {
  poolId: string;
  lpCoinType: string;
}

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

export interface NFTCollection {
  name: string;
  collectionId: string;
  holders: ReadonlyArray<string>;
}

export interface NFTCollectionMetadata {
  id: string;
  img: string;
  name: string;
  total: number;
  updatedAt?: number;
}

export interface ZkSendLinkData {
  id: string;
  digest: string;
  links: ReadonlyArray<string>;
}

export enum PoolTypeEnum {
  clamm = 'clamm',
  amm = 'amm',
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
  // we do not use
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
  poolType: PoolTypeEnum.amm;
  isVolatile: boolean;
}

interface ClammAGamma {
  a: BigNumber;
  gamma: BigNumber;
  futureA: BigNumber;
  futureGamma: BigNumber;
  initialTime: BigNumber;
  futureTime: BigNumber;
}

interface ClammFees {
  midFee: BigNumber;
  outFee: BigNumber;
  gammaFee: BigNumber;
  adminFee: BigNumber;
}

interface ClammRebalancingParams {
  maHalfTime: BigNumber;
  extraProfit: BigNumber;
  adjustmentStep: BigNumber;
}

interface ClammCoinState {
  index: BigNumber;
  price: BigNumber;
  priceOracle: BigNumber;
  lastPrice: BigNumber;
  decimalsScalar: BigNumber;
  typeName: string;
  type: string;
}

export interface ClammPool {
  poolId: string;
  stateId: string;
  minA: BigNumber;
  maxA: BigNumber;
  nCoins: BigNumber;
  isAdjusted: boolean;
  xcpProfit: BigNumber;
  xcpProfitA: BigNumber;
  adminBalance: BigNumber;
  lpCoinSupply: BigNumber;
  virtualPrice: BigNumber;
  poolType: PoolTypeEnum.clamm;
  lastPriceTimestamp: BigNumber;
  balances: ReadonlyArray<BigNumber>;
  aGamma: ClammAGamma;
  fees: ClammFees;
  coinStates: ReadonlyArray<ClammCoinState>;
  rebalancingParams: ClammRebalancingParams;
}

export type Pool = ClammPool | AmmPool;
