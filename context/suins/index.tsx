import { SuinsClient } from '@mysten/suins-toolkit';
import { useWalletKit } from '@mysten/wallet-kit';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { mainnetClient, testnetClient } from '@/hooks/use-sui-client';
import { noop } from '@/utils';

import { ISuiNsContext } from './suins.types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const testnetSuiNs = new SuinsClient(testnetClient, {
  networkType: 'testnet',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const suiNSMainNetProvider = new SuinsClient(mainnetClient, {
  contractObjects: {
    packageId:
      '0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0',
    suins: '0x6e0ddefc0ad98889c04bab9639e512c21766c5e6366f89e696956d9be6952871',
    registry:
      '0xe64cd9db9f829c6cc405d9790bd71567ae07259855f4fba6f02c84f52298c106',
    reverseRegistry:
      '0x2fd099e17a292d2bc541df474f9fafa595653848cbabb2d7a4656ec786a1969f',
  },
});

const suiNsClientMap = {
  [Network.MAINNET]: testnetSuiNs,
  [Network.TESTNET]: suiNSMainNetProvider,
} as Record<Network, SuinsClient>;

const suiNsContext = createContext<ISuiNsContext>({} as ISuiNsContext);

export const SuiNsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = suiNsContext;
  const { network } = useNetwork();
  const { accounts } = useWalletKit();
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<Record<string, string>>({});

  const provider = suiNsClientMap[network];

  useEffect(() => {
    if (accounts.length) {
      setLoading(true);

      const promises = accounts.map((walletAccount) =>
        provider.getName(walletAccount.address)
      );

      Promise.all(promises)
        .then(async (names) => {
          setNames(
            names.reduce(
              (acc, name, index) =>
                name ? { ...acc, [accounts[index].address]: name } : acc,
              {} as Record<string, string>
            )
          );
        })
        .catch(noop)
        .finally(() => setLoading(false));
    }
  }, [network, accounts]);

  const value = {
    names,
    loading,
    provider,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useSuiNs = () => useContext(suiNsContext);

export default suiNsContext;
