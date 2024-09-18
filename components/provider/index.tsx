import { getFullnodeUrl } from '@mysten/sui/client';
import { FC, PropsWithChildren } from 'react';

import { Network } from '@/constants';

import { SuiProvider } from '../../resui';
import ThemeManager from '../theme-manager';

const LOCAL_NETWORK_KEY = 'suicoins:network';

const networks = [
  {
    network: Network.TESTNET,
    rpc:
      process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
  },
  {
    network: Network.MAINNET,
    rpc:
      process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
  },
];

const onChangeNetwork = (network: string) =>
  window.localStorage.setItem(LOCAL_NETWORK_KEY, network);

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <SuiProvider
      networks={networks}
      onChangeNetwork={onChangeNetwork}
      wallet={{ autoConnect: true, stashedWallet: { name: 'Sui Coins' } }}
      defaultNetwork={
        window.localStorage.getItem(LOCAL_NETWORK_KEY) ?? Network.MAINNET
      }
    >
      {children}
    </SuiProvider>
  </ThemeManager>
);

export default Provider;
