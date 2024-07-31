import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { CoinStruct } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import toast from 'react-hot-toast';
import invariant from 'tiny-invariant';

import { CoinObject } from '@/components/web3-manager/coins-manager/coins-manager.types';
import { useNetwork } from '@/hooks/use-network';
import { useWeb3 } from '@/hooks/use-web3';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { FixedPointMath } from '@/lib';
import {
  isSui,
  showTXSuccessToast,
  signAndExecute,
  waitForTx,
  ZERO_BIG_NUMBER,
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

    let i = 0;
    let digest: string;
    let version: string;
    let txResult: TimedSuiTransactionBlockResponse | undefined = undefined;
    const gasObjectId = coinsMap[SUI_TYPE_ARG]?.objects[0].coinObjectId;

    do {
      const tx = new Transaction();

      coinsToMerge
        .filter(({ type, objects }) => !isSui(type) && objects.length > 256 * i)
        .map(({ objects: [target, ...others] }) => {
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

      if (coinsMap[SUI_TYPE_ARG]?.objects.length > 256 * (i + 1)) {
        const gasCoins = coinsMap[SUI_TYPE_ARG].objects.reduce(
          ([first, ...rest], curr) =>
            FixedPointMath.toBigNumber(first?.balance ?? ZERO_BIG_NUMBER).lt(
              FixedPointMath.toBigNumber(curr.balance)
            )
              ? [curr, first, ...rest]
              : [first, curr, ...rest],
          [] as ReadonlyArray<Omit<CoinStruct, 'coinType'> & { type: string }>
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

      toast.success('Coins slot merged!');
      showTXSuccessToast(txResult, network);
      i++;
    } while (coinsToMerge.some(({ objects }) => objects.length > 256 * i));
  };
};
