import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Network } from '../../constants/network';

interface INetworkContext {
  network: Network;
  changeNetwork: (network: Network) => void;
}

const LOCAL_NETWORK_KEY = 'movement:network';

const networkContext = createContext<INetworkContext>({} as INetworkContext);

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

  return <Provider value={{ network, changeNetwork }}>{children}</Provider>;
};

export const useNetwork = () => useContext(networkContext);

export default networkContext;
