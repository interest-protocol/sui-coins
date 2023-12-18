import { SuiClient } from '@mysten/sui.js/client';

import { RPC_URL } from '@/constants';
import { useNetwork } from '@/context/network';
import { Network } from '@/lib';

const client = {
  [Network.DEVNET]: new SuiClient({
    url: RPC_URL[Network.DEVNET],
  }),
};

export const useMovementClient = (): SuiClient => {
  const { network } = useNetwork();

  return client[network];
};
