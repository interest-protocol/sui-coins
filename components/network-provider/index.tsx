import { createContext, FC } from 'react';

import { Network } from '@/constants';

import {
  NetworkProviderProps,
  NetworkProviderState,
} from './network-provider.types';

const CONTEXT_DEFAULT_STATE = {
  network: Network.TESTNET,
};

export const NetworkProviderContext = createContext<NetworkProviderState>(
  CONTEXT_DEFAULT_STATE
);

const NetworkProvider: FC<NetworkProviderProps> = ({ children }) => {
  const network = Network.TESTNET;

  return (
    <NetworkProviderContext.Provider value={{ network }}>
      {children}
    </NetworkProviderContext.Provider>
  );
};

export default NetworkProvider;
