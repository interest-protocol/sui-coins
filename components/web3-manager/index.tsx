import { useWalletKit } from '@mysten/wallet-kit';
import { createContext, FC } from 'react';

import { noop } from '@/utils';

import { Web3ManagerProps, Web3ManagerState } from './web3-manager.types';

const CONTEXT_DEFAULT_STATE = {
  account: null,
  walletAccount: null,
  coins: [],
  coinsMap: {},
  connected: false,
  error: false,
  mutate: noop,
  isFetchingCoinBalances: false,
};

export const Web3ManagerContext = createContext<Web3ManagerState>(
  CONTEXT_DEFAULT_STATE
);

const Web3Manager: FC<Web3ManagerProps> = ({ children }) => {
  const { isError, currentAccount, isConnected } = useWalletKit();

  return (
    <Web3ManagerContext.Provider
      value={{
        account: currentAccount?.address || null,
        walletAccount: currentAccount || null,
        error: isError,
        connected: isConnected,
      }}
    >
      {children}
    </Web3ManagerContext.Provider>
  );
};

export default Web3Manager;
