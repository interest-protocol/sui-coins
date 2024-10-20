import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import invariant from 'tiny-invariant';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { FixedPointMath } from '@/lib';
import {
  chunk,
  getCoins,
  isSui,
  showTXSuccessToast,
  signAndExecute,
  waitForTx,
} from '@/utils';

import { findNextVersionAndDigest } from '../airdrop/airdrop-form/txb-utils';

export const useMergeCoins = () => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (coinsToMerge: ReadonlyArray<CoinObject>) => {
    invariant(currentAccount?.address, 'You must be connected');

    for (const slotToMerge of chunk(coinsToMerge, 8)) {
      let i = 0;
      let digest: string;
      let version: string;
      let txResult: TimedSuiTransactionBlockResponse | undefined;
      const gasObjectId = (
        await suiClient.getCoins({
          owner: currentAccount.address,
          coinType: SUI_TYPE_ARG,
          limit: 1,
        })
      ).data[0].coinObjectId;

      do {
        const tx = new Transaction();

        slotToMerge
          .filter(
            ({ type, objectsCount }) => !isSui(type) && objectsCount > 256 * i
          )
          .forEach(async ({ type }) => {
            const [target, ...others] = await getCoins({
              suiClient,
              coinType: type,
              account: currentAccount.address,
            });

            let targetVersion, targetDigest;
            if (txResult)
              [targetDigest, targetVersion] = findNextVersionAndDigest(
                txResult,
                target.coinObjectId
              );

            tx.mergeCoins(
              tx.objectRef({
                objectId: target.coinObjectId,
                digest: targetDigest ?? target.digest,
                version: targetVersion ?? target.version,
              }),
              others
                .slice(256 * i, 256 * (i + 1) - 1)
                .map(({ coinObjectId }) => tx.object(coinObjectId))
            );
          });

        if (coinsMap[SUI_TYPE_ARG]?.objectsCount > 256 * (i + 1)) {
          const allSuiObjects = await getCoins({
            suiClient,
            account: currentAccount.address,
            coinType: SUI_TYPE_ARG,
          });
          const gasCoins = allSuiObjects.toSorted((a, b) =>
            FixedPointMath.toBigNumber(a.balance).gt(
              FixedPointMath.toBigNumber(b.balance)
            )
              ? -1
              : 1
          );

          let gasCoinsFormatted = gasCoins
            .filter((item) => item)
            .slice(256 * i, 256 * (i + 1) - 1)
            .map(({ coinObjectId, version, digest }) => ({
              objectId: coinObjectId,
              version,
              digest,
            }));

          if (txResult) {
            [digest, version] = findNextVersionAndDigest(txResult, gasObjectId);

            gasCoinsFormatted = [
              { objectId: gasObjectId, version, digest },
              ...gasCoinsFormatted,
            ];
          }

          tx.setGasPayment(gasCoinsFormatted.slice(0, 255));
        } else if (txResult) {
          [digest, version] = findNextVersionAndDigest(txResult, gasObjectId);

          tx.setGasPayment([
            {
              objectId: gasObjectId,
              version,
              digest,
            },
          ]);
        }

        txResult = await signAndExecute({
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

        showTXSuccessToast(txResult, network, 'Coins slot merged!');
        i++;
      } while (slotToMerge.some(({ objectsCount }) => objectsCount > 256 * i));
    }
  };
};
