import { isValidSuiAddress, normalizeSuiAddress } from '@mysten/sui.js/utils';

export function validateAndNormalizeSuiAddress(address: string): string | null {
  const normalizedAddr = normalizeSuiAddress(address);
  if (!isValidSuiAddress(normalizedAddr)) {
    return null;
  }
  return normalizedAddr;
}

export const isSameAddress = (addressA: string, addressB: string) =>
  normalizeSuiAddress(addressA) === normalizeSuiAddress(addressB);
