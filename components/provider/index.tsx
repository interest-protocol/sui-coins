import 'react-loading-skeleton/dist/skeleton.css';

import { WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { ModalProvider } from '@/context/modal';
import { NetworkProvider } from '@/context/network';

import ThemeManager from '../theme-manager';
import Web3Manager from '../web3-manager';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <WalletProvider autoConnect>
          <Web3Manager />
          <ModalProvider>{children}</ModalProvider>
        </WalletProvider>
      </NetworkProvider>
    </QueryClientProvider>
  </ThemeManager>
);

export default Provider;
