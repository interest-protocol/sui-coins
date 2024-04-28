import { SuiClient } from '@mysten/sui.js/client';

import { Network, RPC_URL } from '@/constants';

export const movementClient = {
  [Network.DEVNET]: new SuiClient({
    url: RPC_URL[Network.DEVNET],
  }),
  [Network.TESTNET]: new SuiClient({
    url: RPC_URL[Network.TESTNET],
  }),
};
