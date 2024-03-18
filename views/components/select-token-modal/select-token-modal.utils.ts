import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinMetadataWithType } from '@/interface';
import { getSymbolByType, ZERO_BIG_NUMBER } from '@/utils';

export const metadataToCoin = (coinMetadata: CoinMetadataWithType) => {
  const { type, symbol, decimals, ...metadata } = coinMetadata;

  return {
    type,
    symbol,
    decimals,
    metadata,
    objects: [],
    balance: ZERO_BIG_NUMBER,
    coinObjectId: metadata.id!,
  };
};

export const mapMetadataToCoin = (
  coinType: `0x${string}`,
  coinsMetadata: Record<string, CoinMetadataWithType>
): CoinObject => {
  if (!coinType || !coinsMetadata[coinType])
    return {
      decimals: 0,
      objects: [],
      coinObjectId: '',
      type: coinType,
      balance: ZERO_BIG_NUMBER,
      symbol: getSymbolByType(coinType),
      metadata: {
        description: '',
        name: getSymbolByType(coinType),
      },
    };

  return metadataToCoin(coinsMetadata[coinType]);
};
