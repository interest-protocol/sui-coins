import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import useSWR from 'swr';

import { useObjects } from '@/hooks/use-objects';
import { makeSWRKey } from '@/utils';

import { OBJECT_GUARDIANS_BLOCKLIST } from './all-objects.data';
import { ObjectData, TGetAllObjects } from './all-objects.types';

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

const AllObjectsManager: FC<{ withBlocked?: boolean }> = ({ withBlocked }) => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const { id, delay, updateAllObjects, updateError, updateLoading } =
    useObjects();

  useSWR(
    makeSWRKey(
      [id, network, currentAccount?.address],
      suiClient.getOwnedObjects.name
    ),
    async () => {
      try {
        updateError(false);
        updateLoading(true);

        if (!currentAccount)
          return {
            coinsObjects: [],
            ownedNfts: [],
            otherObjects: [],
          };

        const objectsRaw = await getAllObjects(
          suiClient,
          currentAccount.address
        );

        const objectGuardiansBlocklist = await fetch(
          'https://guardians.suiet.app/object-list.json'
        )
          .then((response) => response.json?.())
          .then((data) => data.blocklist)
          .catch(() => OBJECT_GUARDIANS_BLOCKLIST);

        const objects: ReadonlyArray<ObjectData> = objectsRaw.reduce(
          (acc, objectRaw) => {
            if (!objectRaw.data?.content?.dataType) return acc;
            if (objectRaw.data.content.dataType !== 'moveObject') return acc;
            if (!objectRaw.data.content.hasPublicTransfer) return acc;
            if (
              !withBlocked &&
              objectGuardiansBlocklist.includes(objectRaw.data.type!)
            )
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
          objects.filter((object) =>
            object.type.startsWith('0x2::coin::Coin<')
          ),
          objects.filter(
            (object) =>
              !object.type.startsWith('0x2::coin::Coin<') && object.display
          ),
          objects.filter(
            (object) =>
              !object.type.startsWith('0x2::coin::Coin<') && !object.display
          ),
        ];

        const data = { coinsObjects, ownedNfts, otherObjects };

        updateAllObjects(data);
      } catch {
        updateError(true);
      } finally {
        updateLoading(false);
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
      refreshInterval: delay,
    }
  );

  return null;
};

export default AllObjectsManager;
