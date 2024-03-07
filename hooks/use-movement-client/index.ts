import { SuiClient } from '@mysten/sui.js/client';

import { RPC_URL } from '@/constants';
import { useNetwork } from '@/context/network';

import { Network } from '../../constants/network';

const client = {
  [Network.DEVNET]: new SuiClient({
    url: RPC_URL[Network.DEVNET],
  }),
  [Network.TESTNET]: new SuiClient({
    url: RPC_URL[Network.TESTNET],
  }),
};

export const useMovementClient = (): SuiClient => {
  const { network } = useNetwork();

  return client[network];
};
