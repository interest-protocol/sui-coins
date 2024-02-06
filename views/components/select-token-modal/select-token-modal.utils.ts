import { CoinObject } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import { CoinMetadataWithType } from '@/interface';
import { getSymbolByType } from '@/utils';

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
): CoinObject => {
  if (!coinType || !coinsMetadata[coinType])
    return {
      decimals: 0,
      balance: '',
      objects: [],
      coinObjectId: '',
      type: coinType,
      symbol: getSymbolByType(coinType),
      metadata: {
        description: '',
        name: getSymbolByType(coinType),
      },
    };

  return metadataToCoin(coinsMetadata[coinType]);
};
