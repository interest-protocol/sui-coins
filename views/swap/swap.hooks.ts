import { Aftermath } from 'aftermath-ts-sdk';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';

const INIT_ARG = {
  [Network.TESTNET]: 'TESTNET',
  [Network.MAINNET]: 'MAINNET',
};

export const useAftermathRouter = () => {
  const network = useNetwork();

  return new Aftermath(INIT_ARG[network]).Router();
};
