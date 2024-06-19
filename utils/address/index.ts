import {
  isValidSuiAddress,
  normalizeStructTag,
  normalizeSuiAddress,
} from '@mysten/sui/utils';

export function validateAndNormalizeSuiAddress(address: string): string | null {
  const normalizedAddr = normalizeSuiAddress(address);
  if (!isValidSuiAddress(normalizedAddr)) {
    return null;
  }
  return normalizedAddr;
}

export const isSameAddress = (addressA: string, addressB: string) =>
  normalizeSuiAddress(addressA) === normalizeSuiAddress(addressB);

export const isSameStructTag = (tagA: string, tagB: string) =>
  normalizeStructTag(tagA) === normalizeStructTag(tagB);
