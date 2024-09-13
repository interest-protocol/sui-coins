import { getFullnodeUrl } from '@mysten/sui/dist/cjs/client';
import { FC, PropsWithChildren } from 'react';

import { Network } from '@/constants';

import { SuiProvider } from '../../resui/sui-provider';
import ThemeManager from '../theme-manager';

const LOCAL_NETWORK_KEY = 'suicoins:network';

const networks = [
  {
    network: Network.TESTNET,
    url:
      process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
  },
  {
    network: Network.MAINNET,
    url:
      process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
  },
];

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <SuiProvider
      networks={networks}
      wallet={{ autoConnect: true, stashedWallet: { name: 'Sui Coins' } }}
      defaultNetwork={
        window.localStorage.getItem(LOCAL_NETWORK_KEY) ?? Network.MAINNET
      }
    >
      {' '}
      {children}
    </SuiProvider>
  </ThemeManager>
);

export default Provider;
