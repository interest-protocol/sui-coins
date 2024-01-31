import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinMetadataWithType } from '@/interface';

export const metadataToCoin = (coinMetadata: CoinMetadataWithType) => {
  const { type, symbol, decimals, ...metadata } = coinMetadata;

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

export const mapMetadataToCoin = (
  coinType: string,
  coinsMetadata: Record<string, CoinMetadataWithType>
): CoinObject | null => {
  if (!coinType || !coinsMetadata[coinType]) return null;

  return metadataToCoin(coinsMetadata[coinType]);
};
