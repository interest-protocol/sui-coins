import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { FC, PropsWithChildren } from 'react';
import invariant from 'tiny-invariant';

import { NetworkProviderProps } from './network.types';
import { isValidSuiNetwork } from './network.utils';

export const NetworkProvider: FC<PropsWithChildren<NetworkProviderProps>> = ({
  children,
  networks,
  defaultNetwork,
  onChangeNetwork,
}) => {
  invariant(
    networks.some(({ network, rpc }) => isValidSuiNetwork(network) || rpc),
    'No RPC provided for the unknown network'
  );

  const config = networks.reduce(
    (acc, { network, rpc }) => ({
      ...acc,
      [network]: {
        rpc: rpc ?? (isValidSuiNetwork(network) ? getFullnodeUrl(network) : ''),
      },
    }),
    {}
  );

  const { networkConfig } = createNetworkConfig(config);

  return (
    <SuiClientProvider
      networks={networkConfig}
      network={defaultNetwork as never}
      onNetworkChange={onChangeNetwork}
    >
      {children}
    </SuiClientProvider>
  );
};
