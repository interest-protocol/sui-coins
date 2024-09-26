import { isValidSuiAddress, normalizeSuiAddress } from '@mysten/sui/utils';
import { propOr } from 'ramda';

import { MAINNET_COINS_INFO } from '@/constants/coins';
import { FixedPointMath } from '@/lib';

import { AirdropData } from './airdrop.types';

export const csvToAirdrop = (
  csv: string,
  decimals: number,
  onError: (message: string) => void
): ReadonlyArray<AirdropData> => {
  try {
    const lines = csv.split('\n').map((x) => x.split(','));

    return lines.reduce((acc, [address, value]) => {
      if (
        address.startsWith('0x') &&
        isValidSuiAddress(normalizeSuiAddress(address)) &&
        value &&
        Number(value) &&
        !isNaN(Number(value))
      )
        return [
          ...acc,
          {
            address,
            amount: FixedPointMath.toBigNumber(value, decimals)
              .decimalPlaces(0)
              .toString(),
          },
        ];

      return acc;
    }, [] as ReadonlyArray<AirdropData>);
  } catch (error) {
    onError(propOr('Something went wrong', 'message', error));
    return [];
  }
};

export const textToAirdrop = (
  text: string,
  commonAmount: string,
  decimals: number,
  onError: (message: string) => void,
  each: boolean = true
): AirdropData[] => {
  try {
    const lines = text.split('\n');
    const addresses = lines.filter((x) => isValidSuiAddress(x));

    const data = [] as AirdropData[];

    addresses.forEach((address) => {
      data.push({
        address,
        amount: FixedPointMath.toBigNumber(
          each ? commonAmount : Number(commonAmount) / address.length,
          decimals
        ).toString(),
      });
    });

    return data;
  } catch (error) {
    onError(propOr('Something went wrong', 'message', error));
    return [];
  }
};

export const getBridgeIdentifier = (bridge: 'celer' | 'wormhole' | null) => {
  if (bridge === 'wormhole') return 'w';
  if (bridge === 'celer') return 'c';
  return '';
};

export const getSymbol = (symbol: string, type: string) => {
  const { origin, bridge } = MAINNET_COINS_INFO[type] ?? {
    origin: null,
    bridge: null,
  };

  return `${symbol}${
    bridge
      ? `(${getBridgeIdentifier(bridge)}${origin ? `-${origin}` : ''})`
      : ''
  }`;
};

export const convertTypeToShortPackedId = (type: string): string => {
  const packageId = type.split('::')[0];

  if (packageId.length < 10) return packageId;

  return `${packageId.slice(0, 6)}...${packageId.slice(-4)}`;
};
