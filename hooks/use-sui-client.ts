import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';

const mainnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
});

const map = {
  [Network.M2]: mainnetClient,
} as Record<Network, SuiClient>;

export const useSuiClient = (network: Network): SuiClient => map[network];
