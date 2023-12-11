import 'react-loading-skeleton/dist/skeleton.css';

import { WalletKitProvider } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { NetworkProvider } from '@/context/network';
import Web3Manager from '@/context/web3-manager';

import ThemeManager from '../theme-manager';

const queryClient = new QueryClient();

const Web3Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <NetworkProvider>
      <QueryClientProvider client={queryClient}>
        <WalletKitProvider>
          <Web3Manager>{children}</Web3Manager>
        </WalletKitProvider>
      </QueryClientProvider>
    </NetworkProvider>
  </ThemeManager>
);

export default Web3Provider;
