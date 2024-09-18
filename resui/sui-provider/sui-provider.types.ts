import type { WalletProviderProps } from '@mysten/dapp-kit';
import type { QueryClientConfig } from '@tanstack/react-query';

import type { NetworkProviderProps } from '../network/network.types';

export interface SuiProviderProps extends NetworkProviderProps {
  queryConfig?: QueryClientConfig;
  wallet?: Omit<WalletProviderProps, 'children'>;
}
