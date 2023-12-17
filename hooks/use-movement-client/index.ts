import { SuiClient } from '@mysten/sui.js/client';

import { Network, RPC_URL } from '@/constants';
import { useNetwork } from '@/context/network';

const client = {
  [Network.DEVNET]: new SuiClient({
    url: RPC_URL[Network.DEVNET],
  }),
};

export const useMovementClient = (): SuiClient => {
  const { network } = useNetwork();

  return client[network];
};
