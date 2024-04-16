import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { RPC_URL } from '@/constants';
import { Network } from '@/constants/network';

const LOCAL_NETWORK_KEY = 'movement:network';

const networkContext = createContext<Network>('' as Network);

const { networkConfig } = createNetworkConfig({
  [Network.TESTNET]: {
    url: RPC_URL[Network.TESTNET],
  },
  [Network.DEVNET]: {
    url: RPC_URL[Network.DEVNET],
  },
});

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = networkContext;
  const [network, setNetwork] = useState<Network>(Network.DEVNET);

  useEffect(() => {
    setNetwork(
      (window.localStorage.getItem(LOCAL_NETWORK_KEY) as Network) ??
        Network.DEVNET
    );
  }, []);

  const changeNetwork = (network: Network) => {
    setNetwork(network);
    window.localStorage.setItem(LOCAL_NETWORK_KEY, network);
  };

  return (
    <SuiClientProvider
      network={network}
      networks={networkConfig}
      onNetworkChange={(network) => {
        changeNetwork(network);
      }}
    >
      <Provider value={network}>{children}</Provider>
    </SuiClientProvider>
  );
};

export const useNetwork = () => useContext(networkContext);

export default networkContext;
