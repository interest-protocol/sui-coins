import { Chain } from '@interest-protocol/sui-tokens';
import { CoinMetadata, CoinStruct, SuiClient } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';

export interface CoinObject extends Pick<CoinMetadata, 'symbol' | 'decimals'> {
  chain?: Chain;
  digest?: string;
  version?: string;
  balance: BigNumber;
  type: `0x${string}`;
  previousTransaction?: string;
  lockedUntilEpoch?: number | null | undefined;
  metadata: Omit<CoinMetadata, 'symbol' | 'decimals'>;
  objects: ReadonlyArray<Omit<CoinStruct, 'coinType'> & { type: string }>;
}

export type CoinsMap = Record<string, CoinObject>;

export type TGetAllCoins = (
  provider: SuiClient,
  account: string,
  cursor?: string | null
) => Promise<ReadonlyArray<CoinStruct>>;
