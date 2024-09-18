import { useAccounts, useSuiClient } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { SuinsClient } from '@mysten/suins';
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
import { useNetwork } from '@/hooks/use-network';
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

const testnetSuiNs = new SuinsClient({
  client: testnetClient as any,
  network: 'testnet',
});

export const suiNSMainNetProvider = new SuinsClient({
  client: mainnetClient as any,
  network: 'mainnet',
});

const suiNsClientRecord = {
  [Network.MAINNET]: suiNSMainNetProvider,
  [Network.TESTNET]: testnetSuiNs,
} as Record<Network, SuinsClient>;

const suiNsContext = createContext<ISuiNsContext>({} as ISuiNsContext);

export const SuiNsProvider: FC<PropsWithChildren> = ({ children }) => {
  const accounts = useAccounts();
  const { Provider } = suiNsContext;
  const network = useNetwork();
  const suiClient = useSuiClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [names, setNames] = useState<Record<string, string[]>>({});
  const [nsImages, setNsImages] = useState<Record<string, string>>({});

  const suiNSProvider = suiNsClientRecord[network];

  useEffect(() => {
    if (accounts.length) {
      setLoading(true);

      const promises = Promise.all(
        accounts.map((acc) =>
          suiClient.resolveNameServiceNames({
            address: acc.address,
          })
        )
      );

      promises
        .then(async (names) => {
          setNames(
            names.reduce(
              (acc, elem, index) => {
                const account = accounts[index];

                return {
                  ...acc,
                  [account.address]: elem.data,
                };
              },
              {} as Record<string, string[]>
            )
          );

          const images: ReadonlyArray<[string | null, string | null]> =
            await Promise.all(
              names.map(async (name) => {
                if (!name || !name.data.length) return [null, null];

                return suiNSProvider
                  .getNameRecord(name.data[0])
                  .then(async (object) => {
                    const nftId = prop('nftId', object as any);

                    if (!nftId) return [name.data[0], null];

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

                    return [name.data[0], imageUrl];
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
    suinsClient: suiNSProvider,
    images: nsImages,
  };

  return <Provider value={value}>{children}</Provider>;
};

export const useSuiNs = () => useContext(suiNsContext);

export default suiNsContext;
