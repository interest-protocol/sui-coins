import 'react-loading-skeleton/dist/skeleton.css';

import { WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { NetworkProvider } from '@/context/network';
import { SuiNsProvider } from '@/context/suins';

import ThemeManager from '../theme-manager';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <NetworkProvider>
      <QueryClientProvider client={queryClient}>
        <WalletProvider autoConnect>
          <SuiNsProvider>{children}</SuiNsProvider>
        </WalletProvider>
      </QueryClientProvider>
    </NetworkProvider>
  </ThemeManager>
);

export default Provider;
