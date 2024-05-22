import { normalizeStructTag, normalizeSuiAddress } from '@mysten/sui.js/utils';

export const isSameAddress = (addressA: string, addressB: string) =>
  normalizeSuiAddress(addressA) === normalizeSuiAddress(addressB);

export const isSameStructTag = (tagA: string, tagB: string) =>
  normalizeStructTag(tagA) === normalizeStructTag(tagB);
