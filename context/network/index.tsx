import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION, Network } from '@/constants';
import { RPC_KEY, RPC_LIST, RpcEnum } from '@/constants/rpc';

const LOCAL_NETWORK_KEY = 'suicoins:network';

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [updateNetwork, setUpdateNetwork] = useState({});
  const currentRPC = useReadLocalStorage<RpcEnum>(
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
      url:
        RPC_LIST[network][currentRPC || RpcEnum.shinami] ||
        getFullnodeUrl('testnet'),
    },
    [Network.MAINNET]: {
      url:
        RPC_LIST[network][currentRPC || RpcEnum.shinami] ||
        getFullnodeUrl('mainnet'),
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
