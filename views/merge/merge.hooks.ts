import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
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

export const MERGE_OBJECTS_LIMIT = 200;

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

    for (const { type, objectsCount } of coinsToMerge) {
      const coinObjects = await getCoins({
        suiClient,
        coinType: type,
        account: currentAccount.address,
      });

      const primaryCoin = coinObjects[0];

      const sortedCoinToMerge = coinObjects
        .slice(1)
        .toSorted((a, b) =>
          FixedPointMath.toNumber(
            BigNumber(b.balance).minus(BigNumber(a.balance))
          )
        );

      const coinToMergeIterable = splitArray(
        sortedCoinToMerge,
        MERGE_OBJECTS_LIMIT
      );

      if (isSui(type)) {
        if (objectsCount > 256) {
          let gasDigest = primaryCoin.digest;
          let gasVersion = primaryCoin.version;
          const gasObjectId = primaryCoin.coinObjectId;

          for (const gasItemsToMerge of coinToMergeIterable) {
            const tx = new Transaction();

            tx.setGasPayment([
              { objectId: gasObjectId, digest: gasDigest, version: gasVersion },
              ...gasItemsToMerge.map(({ coinObjectId, version, digest }) => ({
                digest,
                version,
                objectId: coinObjectId,
              })),
            ]);

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

            [gasDigest, gasVersion] = findNextVersionAndDigest(
              txResult,
              gasObjectId
            );

            onSetExecutionTime && onSetExecutionTime(txResult.time);
            showTXSuccessToast(txResult, network, 'Coins slot merged!');
          }
        } else {
          if (!coinsToMerge.filter(({ type }) => !isSui(type)).length) {
            const txResult = await signAndExecute({
              suiClient,
              currentAccount,
              signTransaction,
              tx: new Transaction(),
              options: { showObjectChanges: true },
            });

            await waitForTx({
              suiClient,
              digest: txResult.digest,
            });

            onSetExecutionTime && onSetExecutionTime(txResult.time);
            showTXSuccessToast(txResult, network, 'Coins slot merged!');
          }
        }
      } else {
        const gasObject = await suiClient.getCoins({
          limit: 1,
          coinType: SUI_TYPE_ARG,
          owner: currentAccount.address,
        });

        let gasDigest = gasObject.data[0].digest;
        let gasVersion = gasObject.data[0].version;
        const gasObjectId = gasObject.data[0].coinObjectId;

        for (const itemsToMerge of coinToMergeIterable) {
          const tx = new Transaction();

          tx.mergeCoins(
            tx.object(primaryCoin.coinObjectId),
            itemsToMerge.map(({ coinObjectId }) => tx.object(coinObjectId))
          );

          tx.setGasPayment([
            { objectId: gasObjectId, digest: gasDigest, version: gasVersion },
          ]);

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

          [gasDigest, gasVersion] = findNextVersionAndDigest(
            txResult,
            gasObjectId
          );

          onSetExecutionTime && onSetExecutionTime(txResult.time);
          showTXSuccessToast(txResult, network, 'Coins slot merged!');
        }
      }
    }
  };
};
