import { useAccounts, useSuiClientContext } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { SuinsClient } from '@mysten/suins-toolkit';
import { fromPairs, pathOr, prop } from 'ramda';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Network } from '@/constants';
import { noop } from '@/utils';

import { ISuiNsContext } from './suins.types';

export const testnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_TESTNET_RPC_URL || getFullnodeUrl('testnet'),
});
export const mainnetClient = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_MAINNET_RPC_URL || getFullnodeUrl('mainnet'),
});

export const suiClientRecord = {
  [Network.MAINNET]: mainnetClient,
  [Network.TESTNET]: testnetClient,
} as Record<Network, SuiClient>;

const testnetSuiNs = new SuinsClient(testnetClient, {
  networkType: 'testnet',
});

export const suiNSMainNetProvider = new SuinsClient(mainnetClient, {
  contractObjects: {
    packageId:
      '0x00c2f85e07181b90c140b15c5ce27d863f93c4d9159d2a4e7bdaeb40e286d6f5',
    suins: '0x6e0ddefc0ad98889c04bab9639e512c21766c5e6366f89e696956d9be6952871',
    registry:
      '0xe64cd9db9f829c6cc405d9790bd71567ae07259855f4fba6f02c84f52298c106',
    reverseRegistry:
      '0x2fd099e17a292d2bc541df474f9fafa595653848cbabb2d7a4656ec786a1969f',
  },
});

const suiNsClientRecord = {
  [Network.MAINNET]: suiNSMainNetProvider,
  [Network.TESTNET]: testnetSuiNs,
} as Record<Network, SuinsClient>;

const suiNsContext = createContext<ISuiNsContext>({} as ISuiNsContext);

export const SuiNsProvider: FC<PropsWithChildren> = ({ children }) => {
  const accounts = useAccounts();
  const { Provider } = suiNsContext;
  const { network } = useSuiClientContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<Record<string, string>>({});
  const [nsImages, setNsImages] = useState<Record<string, string>>({});

  const provider = suiNsClientRecord[network as Network];

  useEffect(() => {
    if (accounts.length) {
      setLoading(true);

      const promises = accounts.map((account) =>
        provider.getName(account.address).catch(() => null)
      );

      Promise.all(promises)
        .then(async (namesServer) => {
          const filteredNS = namesServer?.filter((nameServer) => !!nameServer);

          if (!filteredNS || !filteredNS.length) return {};

          setNames(
            filteredNS.reduce(
              (acc, name, index) =>
                name ? { ...acc, [accounts[index].address]: name } : acc,
              {} as Record<string, string>
            )
          );

          const images: ReadonlyArray<[string | null, string | null]> =
            await Promise.all(
              filteredNS.map(async (nameServer) => {
                if (!nameServer) return [null, null];

                return provider
                  .getNameObject(nameServer, {
                    showAvatar: true,
                  })
                  .then(async (object) => {
                    const nftId = prop('nftId', object as any);

                    if (!nftId) return [nameServer, null];

                    const nft = await suiClientRecord[
                      network as Network
                    ].getObject({
                      id: nftId,
                      options: { showDisplay: true },
                    });

                    const imageUrl = pathOr(
                      null,
                      ['data', 'display', 'data', 'image_url'],
                      nft
                    ) as string | null;

                    return [nameServer, imageUrl];
                  });
              })
            );

          setNsImages(
            fromPairs(
              images.filter(
                (image) => !!image.length && !!image[0] && !!image[1]
              ) as ReadonlyArray<[string, string]>
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
    images: nsImages,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useSuiNs = () => useContext(suiNsContext);

export default suiNsContext;
