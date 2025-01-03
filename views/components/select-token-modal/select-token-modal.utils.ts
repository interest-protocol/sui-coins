import { CoinMetadataWithType } from '@/interface';
import { getSymbolByType, ZERO_BIG_NUMBER } from '@/utils';

import { CoinObject } from '../../../components/web3-manager/coins-manager/coins-manager.types';

export const metadataToCoin = (coinMetadata: CoinMetadataWithType) => {
  const { type, symbol, decimals, ...metadata } = coinMetadata;

  return {
    type,
    symbol,
    decimals,
    metadata,
    objectsCount: 0,
    balance: ZERO_BIG_NUMBER,
  };
};

export const mapMetadataToCoin = (
  coinType: `0x${string}`,
  coinsMetadata: Record<string, CoinMetadataWithType>
): CoinObject => {
  if (!coinType || !coinsMetadata[coinType])
    return {
      decimals: 0,
      type: coinType,
      objectsCount: 0,
      balance: ZERO_BIG_NUMBER,
      symbol: getSymbolByType(coinType),
      metadata: {
        description: '',
        name: getSymbolByType(coinType),
      },
    };

  return metadataToCoin(coinsMetadata[coinType]);
};
