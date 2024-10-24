import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { CoinStruct } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import invariant from 'tiny-invariant';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import {
  getCoins,
  isSui,
  showTXSuccessToast,
  signAndExecute,
  splitArray,
  waitForTx,
} from '@/utils';

import { findNextVersionAndDigest } from '../airdrop/airdrop-form/txb-utils';
import { getObjectsToMerge, MERGE_OBJECTS_LIMIT } from './merge.utils';

const TX_OBJECTS_LIMIT = 4000;

export const useMergeCoins = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    coinsToMerge: ReadonlyArray<CoinObject>,
    onSetExecutionTime?: (time: number) => void
  ) => {
    invariant(currentAccount?.address, 'You must be connected');

    let i = 0;
    let j = 0;
    let suiDigest;
    let suiVersion;
    let suiIndex = 0;

    const objectsToMerge = await getObjectsToMerge({
      suiClient,
      account: currentAccount.address,
      coinsToMerge: coinsToMerge.filter(({ type }) => !isSui(type)),
    });

    const suiObjects = await getCoins({
      suiClient,
      coinType: SUI_TYPE_ARG,
      account: currentAccount.address,
    });

    const sortedSuiObjects = suiObjects.toSorted((a, b) =>
      FixedPointMath.toNumber(BigNumber(b.balance).minus(BigNumber(a.balance)))
    );

    const mergingSui: [CoinStruct, ReadonlyArray<ReadonlyArray<CoinStruct>>] = [
      sortedSuiObjects[0],
      splitArray(sortedSuiObjects.slice(1), MERGE_OBJECTS_LIMIT),
    ];

    suiDigest = sortedSuiObjects[0].digest;
    suiVersion = sortedSuiObjects[0].version;
    const suiObjectId = sortedSuiObjects[0].coinObjectId;

    do {
      let totalMergingObjects = mergingSui[1][suiIndex]?.length ?? 0;

      const mergingItems: Array<[string, ReadonlyArray<CoinStruct>]> = [];

      do {
        if (objectsToMerge[j][1][i].length) {
          if (
            totalMergingObjects + objectsToMerge[j][1][i].length >
            TX_OBJECTS_LIMIT
          ) {
            j++;
            break;
          }
          mergingItems.push([objectsToMerge[j][0], objectsToMerge[j][1][i]]);
          totalMergingObjects += objectsToMerge[j][1][i].length;
        }
        j++;
      } while (objectsToMerge[j]);

      if (!objectsToMerge[j]) {
        j = 0;
        i++;
      }

      const tx = new Transaction();

      if (suiObjects.length > 256 && mergingSui[1][suiIndex]?.length) {
        tx.setGasPayment([
          {
            digest: suiDigest,
            version: suiVersion,
            objectId: suiObjectId,
          },
          ...mergingSui[1][suiIndex].map(
            ({ digest, version, coinObjectId }) => ({
              digest,
              version,
              objectId: coinObjectId,
            })
          ),
        ]);

        suiIndex++;
      }

      mergingItems.forEach(([primaryObject, otherObjects]) => {
        if (isSui(otherObjects[0].coinType)) return tx.setGasPayment([]);

        return tx.mergeCoins(
          tx.object(primaryObject),
          otherObjects.map(({ coinObjectId }) => tx.object(coinObjectId))
        );
      });

      const txResult = await signAndExecute({
        tx,
        suiClient,
        currentAccount,
        signTransaction,
        options: { showObjectChanges: true },
      });

      await waitForTx({
        suiClient,
        digest: txResult.digest,
      });

      [suiDigest, suiVersion] = findNextVersionAndDigest(txResult, suiObjectId);

      onSetExecutionTime && onSetExecutionTime(txResult.time);
      showTXSuccessToast(txResult, network, 'Coins slot merged!');
    } while (!j && objectsToMerge.some(([, objects]) => objects[i]));
  };
};
