import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { FC, PropsWithChildren, useMemo, useState } from 'react';

import { Network } from '@/constants';

const LOCAL_NETWORK_KEY = 'suicoins:network';

const { networkConfig } = createNetworkConfig({
  [Network.TESTNET]: {
    url:
      process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
  },
  [Network.MAINNET]: {
    url:
      process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
  },
});

export const NetworkProvider: FC<PropsWithChildren> = ({ children }) => {
  const [updateNetwork, setUpdateNetwork] = useState({});

  const network = useMemo(
    () =>
      (window.localStorage.getItem(LOCAL_NETWORK_KEY) as Network) ??
      Network.MAINNET,
    [updateNetwork]
  );

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
