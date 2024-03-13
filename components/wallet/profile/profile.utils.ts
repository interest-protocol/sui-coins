import { formatAddress } from '@mysten/sui.js/utils';

export const getName = (
  account: string,
  suiNSRecord: Record<string, string>
): string => suiNSRecord[account] ?? formatAddress(account);
