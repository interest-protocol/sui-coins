import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import useSWR from 'swr';

import { useNetwork } from '@/context/network';
import { makeSWRKey } from '@/utils';

import { ObjectData, TGetAllObjects } from './use-get-all-objects.types';

const getAllObjects: TGetAllObjects = async (
  provider,
  account,
  cursor = null
) => {
  const { data, nextCursor, hasNextPage } = await provider.getOwnedObjects({
    owner: account,
    cursor,
    options: { showDisplay: true, showContent: true },
  });

  if (!hasNextPage) return data;

  const newData = await getAllObjects(provider, account, nextCursor);

  return [...data, ...newData];
};

export const useGetAllObjects = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return useSWR(
    makeSWRKey(
      [network, currentAccount?.address],
      suiClient.getOwnedObjects.name
    ),
    async () => {
      if (!currentAccount) return {};

      const objectsRaw = await getAllObjects(suiClient, currentAccount.address);

      console.log({ objectsRaw });

      const objects: ReadonlyArray<ObjectData> = objectsRaw.reduce(
        (acc, objectRaw) => {
          if (!objectRaw.data?.content?.dataType) return acc;
          if (objectRaw.data.content.dataType !== 'moveObject') return acc;
          if (!objectRaw.data.content.hasPublicTransfer) return acc;

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

      if (!objects.length) return {};

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
};
