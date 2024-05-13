import { CLAMM as CLAMM_ } from '@interest-protocol/clamm-sdk';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';
import { CLAMM_PACKAGE_ADDRESSES } from '@/constants/dex';

export const testnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
});
export const mainnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
});

export const suiClientRecord = {
  [Network.MAINNET]: mainnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

export const CLAMM = new CLAMM_({
  suiClient: mainnetClient as any,
  network: 'mainnet',
  packageAddress: CLAMM_PACKAGE_ADDRESSES[Network.MAINNET].CLAMM,
  suiTearsAddress: CLAMM_PACKAGE_ADDRESSES[Network.MAINNET].SUITEARS,
});
