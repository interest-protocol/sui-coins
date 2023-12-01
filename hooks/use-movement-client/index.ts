import { SuiClient } from '@mysten/sui.js/client';

import { RPC_URL } from '@/constants';

const client = new SuiClient({
  url: RPC_URL,
});

export const useMovementClient = (): SuiClient => client;
