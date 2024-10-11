import { Chain } from '@interest-protocol/sui-tokens';
import { CoinMetadata } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export interface CoinObject extends Pick<CoinMetadata, 'symbol' | 'decimals'> {
  chain?: Chain;
  digest?: string;
  version?: string;
  balance: BigNumber;
  type: `0x${string}`;
  objectsCount: number;
  previousTransaction?: string;
  lockedUntilEpoch?: number | null | undefined;
  metadata: Omit<CoinMetadata, 'symbol' | 'decimals'>;
}

export type CoinsMap = Record<string, CoinObject>;
