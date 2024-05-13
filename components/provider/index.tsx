import { WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { NetworkProvider } from '@/context/network';
import { SuiNsProvider } from '@/context/suins';

import ThemeManager from '../theme-manager';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <WalletProvider autoConnect stashedWallet={{ name: 'Sui Coins' }}>
          <SuiNsProvider>{children}</SuiNsProvider>
        </WalletProvider>
      </NetworkProvider>
    </QueryClientProvider>
  </ThemeManager>
);

export default Provider;
