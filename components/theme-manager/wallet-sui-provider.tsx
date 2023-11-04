import { WalletKitProvider } from '@mysten/wallet-kit';
import dynamic from 'next/dynamic';
import { FC, PropsWithChildren } from 'react';

import LoadingPage from '../../views/loading';

const WalletSuiProvider: FC<PropsWithChildren> = ({ children }) => (
  <WalletKitProvider>{children}</WalletKitProvider>
);

export default dynamic(() => Promise.resolve(WalletSuiProvider), {
  ssr: false,
  loading: LoadingPage,
});
