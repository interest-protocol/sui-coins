import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { createContext, FC, PropsWithChildren, useContext, useId } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { useNetwork } from '@/context/network';
import { makeSWRKey } from '@/utils';

import {
  AllCoins,
  ObjectData,
  TGetAllObjects,
} from '../../context/all-objects/all-objects.types';
import { OBJECT_GUARDIANS_BLOCKLIST } from './all-objects.data';

const getAllObjects: TGetAllObjects = async (
  provider,
  account,
  cursor = null
) => {
  const { data, nextCursor, hasNextPage } = await provider.getOwnedObjects({
    owner: account,
    cursor,
    options: { showContent: true, showType: true, showDisplay: true },
  });

  if (!hasNextPage) return data;

  const newData = await getAllObjects(provider, account, nextCursor);

  return [...data, ...newData];
};

const allObjectsContext = createContext<SWRResponse<AllCoins>>(
  {} as SWRResponse<AllCoins>
);

export const AllObjectsProvider: FC<PropsWithChildren> = ({ children }) => {
  const id = useId();
  const network = useNetwork();
  const suiClient = useSuiClient();
  const { Provider } = allObjectsContext;
  const currentAccount = useCurrentAccount();

  const data = useSWR<AllCoins>(
    makeSWRKey(
      [id, network, currentAccount?.address],
      suiClient.getOwnedObjects.name
    ),
    async () => {
      if (!currentAccount)
        return {
          coinsObjects: [],
          ownedNfts: [],
          otherObjects: [],
        };

      const objectsRaw = await getAllObjects(suiClient, currentAccount.address);

      const objects: ReadonlyArray<ObjectData> = objectsRaw.reduce(
        (acc, objectRaw) => {
          if (!objectRaw.data?.content?.dataType) return acc;
          if (objectRaw.data.content.dataType !== 'moveObject') return acc;
          if (!objectRaw.data.content.hasPublicTransfer) return acc;
          if (OBJECT_GUARDIANS_BLOCKLIST.includes(objectRaw.data.type!))
            return acc;

          return [
            ...acc,
            {
              type: objectRaw.data.content.type,
              objectId: objectRaw.data.objectId,
              display: objectRaw.data.display?.data,
            },
          ];
        },
        [] as ReadonlyArray<ObjectData>
      );

      if (!objects.length)
        return {
          coinsObjects: [],
          ownedNfts: [],
          otherObjects: [],
        };

      const [coinsObjects, ownedNfts, otherObjects] = [
        objects.filter((object) => object.type.startsWith('0x2::coin::Coin<')),
        objects.filter(
          (object) =>
            !object.type.startsWith('0x2::coin::Coin<') && object.display
        ),
        objects.filter(
          (object) =>
            !object.type.startsWith('0x2::coin::Coin<') && !object.display
        ),
      ];

      return { coinsObjects, ownedNfts, otherObjects };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: 10000,
    }
  );

  return <Provider value={data}>{children}</Provider>;
};

export const useAllObjects = () => useContext(allObjectsContext);

export default allObjectsContext;
