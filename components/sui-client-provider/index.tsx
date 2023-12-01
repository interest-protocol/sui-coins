import 'react-loading-skeleton/dist/skeleton.css';

import { WalletKitProvider } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactNode, StrictMode } from 'react';

import { ThemeManager } from '@/components';
import Web3Manager from '@/components/web3-manager';

const queryClient = new QueryClient();

const SuiClientProvider: FC<PropsWithChildren> = ({ children }): ReactNode => (
  <QueryClientProvider client={queryClient}>
    <WalletKitProvider>
      <Web3Manager>
        <ThemeManager>
          <StrictMode>{children}</StrictMode>
        </ThemeManager>
      </Web3Manager>
    </WalletKitProvider>
  </QueryClientProvider>
);

export default SuiClientProvider;
