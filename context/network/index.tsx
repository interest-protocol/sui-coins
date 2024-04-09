import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Network } from '@/constants';

const LOCAL_NETWORK_KEY = 'suicoins:network';

const networkContext = createContext<Network>('' as Network);

const { networkConfig } = createNetworkConfig({
  [Network.TESTNET]: {
    url: getFullnodeUrl('testnet'),
  },
  [Network.MAINNET]: {
    url:
      process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
  },
});

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = networkContext;
  const [network, setNetwork] = useState<Network>(Network.MAINNET);

  useEffect(() => {
    setNetwork(
      (window.localStorage.getItem(LOCAL_NETWORK_KEY) as Network) ??
        Network.MAINNET
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
