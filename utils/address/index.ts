import { normalizeSuiAddress } from '@mysten/sui.js/utils';

export const isSameAddress = (addressA: string, addressB: string) =>
  normalizeSuiAddress(addressA) === normalizeSuiAddress(addressB);
