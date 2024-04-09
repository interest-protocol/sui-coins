import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { values } from 'ramda';
import { createContext, FC } from 'react';

import { useGetAllCoins } from '@/hooks/use-get-all-coins';
import { CoinsMap } from '@/hooks/use-get-all-coins/use-get-all-coins.types';
import useNftsMetadata from '@/hooks/use-nfts-metadata';
import { noop } from '@/utils';

import { useAllObjects } from '../all-objects';
import { Web3ManagerProps, Web3ManagerState } from './web3-manager.types';

const CONTEXT_DEFAULT_STATE = {
  nfts: [],
  coins: [],
  nftsMap: {},
  coinsMap: {},
  error: false,
  mutate: noop,
  account: null,
  ownedNfts: [],
  otherObjects: [],
  coinsObjects: [],
  connected: false,
  walletAccount: null,
  isFetchingCoinBalances: false,
};

export const Web3ManagerContext = createContext<Web3ManagerState>(
  CONTEXT_DEFAULT_STATE
);

const Web3Manager: FC<Web3ManagerProps> = ({ children }) => {
  const { Provider } = Web3ManagerContext;
  const currentAccount = useCurrentAccount();
  const { isConnected } = useCurrentWallet();

  const {
    data: coins,
    error: coinsError,
    mutate: mutateCoins,
    isLoading: fetchingAllCoins,
  } = useGetAllCoins();

  const {
    data: objects,
    error: objectsError,
    mutate: mutateObjects,
    isLoading: fetchingAllObjects,
  } = useAllObjects();

  const {
    data: nfts,
    error: nftsError,
    isLoading: isLoadingNfts,
  } = useNftsMetadata();

  const mutate = () => {
    mutateCoins();
    mutateObjects();
  };

  return (
    <Provider
      value={{
        mutate,
        nfts: nfts ?? [],
        nftsMap: (nfts ?? [])?.reduce?.(
          (acc, curr) => ({ ...acc, [curr.id]: curr }),
          {}
        ),
        connected: isConnected,
        coinsMap: coins ?? ({} as CoinsMap),
        ownedNfts: objects?.ownedNfts ?? [],
        walletAccount: currentAccount || null,
        coins: values(coins ?? ({} as CoinsMap)),
        account: currentAccount?.address || null,
        otherObjects: objects?.otherObjects ?? [],
        error: !!coinsError || nftsError || objectsError,
        isFetchingCoinBalances:
          fetchingAllCoins || fetchingAllObjects || isLoadingNfts,
        coinsObjects: values(coins ?? {}).map((coin) => ({
          ...(objects?.coinsObjects ?? [])!.find(({ type }) =>
            type.includes(coin.type)
          )!,
          display: coin,
        })),
      }}
    >
      {children}
    </Provider>
  );
};

export default Web3Manager;
