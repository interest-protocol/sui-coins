import { isValidSuiAddress, normalizeSuiAddress } from '@mysten/sui.js/utils';
import { propOr } from 'ramda';

import { MAINNET_COINS_INFO } from '@/constants/coins';
import { FixedPointMath } from '@/lib';
import { isBigNumberish } from '@/utils';

import { AirdropData } from './airdrop.types';

export const csvToAirdrop = (
  csv: string,
  onError: (message: string) => void
): AirdropData[] => {
  try {
    const lines = csv.split(',').map((x) => x.replace('\n', ''));

    const addresses = lines.filter(
      (x) => x.startsWith('0x') && isValidSuiAddress(normalizeSuiAddress(x))
    );
    const amounts = lines.filter(
      (x) => !x.startsWith('0x') && isBigNumberish(x)
    );

    if (addresses.length !== amounts.length)
      throw new Error('Numbers of addresses and numbers do not match');

    const data = [] as AirdropData[];

    addresses.forEach((address, i) => {
      data.push({
        address,
        amount: amounts[i],
      });
    });

    return data;
  } catch (error) {
    onError(propOr('Something went wrong', 'message', error));
    return [];
  }
};

export const textToAirdrop = (
  text: string,
  commonAmount: string,
  decimals: number,
  onError: (message: string) => void
): AirdropData[] => {
  try {
    const lines = text.split('\n');
    const addresses = lines.filter((x) => isValidSuiAddress(x));

    const data = [] as AirdropData[];

    addresses.forEach((address) => {
      data.push({
        address,
        amount: FixedPointMath.toBigNumber(commonAmount, decimals).toString(),
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
