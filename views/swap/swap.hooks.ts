import { useSuiClientContext } from '@mysten/dapp-kit';
import { Aftermath } from 'aftermath-ts-sdk';

import { Network } from '@/constants';

const INIT_ARG = {
  [Network.TESTNET]: 'TESTNET',
  [Network.MAINNET]: 'MAINNET',
};

export const useAftermathRouter = () => {
  const { network } = useSuiClientContext();

  return new Aftermath(INIT_ARG[network as Network]).Router();
};
