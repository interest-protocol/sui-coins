import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinMetadataWithType } from '@/interface';

export const metadataToCoin = (
  coinType: string,
  coinsMetadata: Record<string, CoinMetadataWithType>
): CoinObject => {
  const { type, symbol, decimals, ...metadata } = coinsMetadata[coinType];

  return {
    type,
    symbol,
    decimals,
    metadata,
    balance: '',
    objects: [],
    coinObjectId: metadata.id!,
  };
};
