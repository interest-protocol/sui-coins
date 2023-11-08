import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';

import { Network } from '@/constants';

const testnetClient = new SuiClient({ url: getFullnodeUrl('testnet') });
const mainnetClient = new SuiClient({
  url: 'https://api.shinami.com/node/v1/sui_mainnet_f8ba2ad72d9ad60899e56d2f9d813e2b',
});

const map = {
  [Network.MAINNET]: mainnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

export const useSuiClient = (network: Network): SuiClient => map[network];
