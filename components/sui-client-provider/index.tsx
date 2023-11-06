import 'react-loading-skeleton/dist/skeleton.css';

import { WalletKitProvider } from '@mysten/wallet-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactNode, StrictMode } from 'react';

import { ThemeManager } from '@/components';

const queryClient = new QueryClient();

const SuiClientProvider: FC<PropsWithChildren> = ({ children }): ReactNode => (
  <QueryClientProvider client={queryClient}>
    <WalletKitProvider>
      <ThemeManager>
        <StrictMode>{children}</StrictMode>
      </ThemeManager>
    </WalletKitProvider>
  </QueryClientProvider>
);

export default SuiClientProvider;
