import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { RPC_KEY, RPC_MAP, RPCEnum } from '@/constants/rpc';

const LOCAL_NETWORK_KEY = 'suicoins:network';

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [updateNetwork, setUpdateNetwork] = useState({});
  const currentRPC = useReadLocalStorage<RPCEnum>(
    `${LOCAL_STORAGE_VERSION}-${RPC_KEY}`
  );

  const network = useMemo(
    () =>
      (window.localStorage.getItem(LOCAL_NETWORK_KEY) as Network) ??
      Network.MAINNET,
    [updateNetwork]
  );

  const { networkConfig } = createNetworkConfig({
    [Network.TESTNET]: {
      url: RPC_MAP[network][currentRPC as RPCEnum],
    },
    [Network.MAINNET]: {
      url: RPC_MAP[network][currentRPC as RPCEnum],
    },
  });

  const changeNetwork = (network: Network) => {
    window.localStorage.setItem(LOCAL_NETWORK_KEY, network);
    setUpdateNetwork({});
  };

  return (
    <SuiClientProvider
      network={network}
      networks={networkConfig}
      onNetworkChange={changeNetwork}
    >
      {children}
    </SuiClientProvider>
  );
};
