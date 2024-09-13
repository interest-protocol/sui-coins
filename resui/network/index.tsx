import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/dist/cjs/client';
import { FC, PropsWithChildren, useState } from 'react';
import invariant from 'tiny-invariant';

import { NetworkProviderProps } from './network.types';
import { isValidSuiNetwork } from './network.utils';

export const NetworkProvider: FC<PropsWithChildren<NetworkProviderProps>> = ({
  children,
  networks,
  defaultNetwork,
  onChangeNetwork,
}) => {
  const [network, setUpdateNetwork] = useState(defaultNetwork);

  invariant(
    networks.some(({ network, rpc }) => isValidSuiNetwork(network) || rpc),
    'No RPC provided for the unknown network'
  );

  const { networkConfig } = createNetworkConfig(
    networks.reduce(
      (acc, { network, rpc }) => ({
        ...acc,
        [network]: {
          rpc:
            rpc ?? (isValidSuiNetwork(network) ? getFullnodeUrl(network) : ''),
        },
      }),
      {}
    )
  );

  const changeNetwork = (network: string) => {
    onChangeNetwork?.(network);
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
