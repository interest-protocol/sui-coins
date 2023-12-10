import 'react-loading-skeleton/dist/skeleton.css';

import { WalletKitProvider } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { NetworkProvider } from '@/context/network';
import Web3Manager from '@/context/web3-manager';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => (
  <NetworkProvider>
    <QueryClientProvider client={queryClient}>
      <Web3Manager>
        <WalletKitProvider>{children}</WalletKitProvider>
      </Web3Manager>
    </QueryClientProvider>
  </NetworkProvider>
);

export default Web3Provider;
