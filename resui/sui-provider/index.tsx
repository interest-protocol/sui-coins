import { WalletProvider, WalletProviderProps } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { NetworkProvider } from '../network';
import { NetworkProviderProps } from '../network/network.types';
import { SuiNsProvider } from '../suins';

const queryClient = new QueryClient();

export interface SuiProviderProps extends NetworkProviderProps {
  wallet?: Omit<WalletProviderProps, 'children'>;
}

export const SuiProvider: FC<PropsWithChildren<SuiProviderProps>> = ({
  wallet,
  children,
  networks,
  defaultNetwork,
  onChangeNetwork,
}) => (
  <QueryClientProvider client={queryClient}>
    <NetworkProvider
      networks={networks}
      defaultNetwork={defaultNetwork}
      onChangeNetwork={onChangeNetwork}
    >
      <WalletProvider {...wallet}>
        <SuiNsProvider>{children}</SuiNsProvider>
      </WalletProvider>
    </NetworkProvider>
  </QueryClientProvider>
);
