import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { ZkSendLinkBuilder } from '@mysten/zksend';

import { ObjectData } from '@/components/web3-manager/all-objects-manager/all-objects.types';
import { Network, SPONSOR_WALLET } from '@/constants';
import { ZK_BAG_CONTRACT_IDS, ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { FixedPointMath } from '@/lib';
import {
  isSui,
  signAndExecute,
  throwTXIfNotSuccessful,
  waitForTx,
} from '@/utils';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { ObjectField } from '../send-simple.types';

const useCreateLink = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: TimedSuiTransactionBlockResponse, id: string) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const link = new ZkSendLinkBuilder({
      client: suiClient,
      path: '/send/link',
      host: location.origin,
      sender: currentAccount.address,
      contract: ZK_BAG_CONTRACT_IDS[network as Network],
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

    objects.forEach((object) => {
      if (!isCoinObject(object as ObjectData))
        return link.addClaimableObject(object.objectId);

      const amount = BigInt(
        FixedPointMath.toBigNumber(
          object.value!,
          Number(object.display!.decimals!)
        )
          .decimalPlaces(0)
          .toString()
      );

      if (isSui(object.display!.type)) return link.addClaimableMist(amount);

      link.addClaimableBalance(object.display!.type, amount);
    });

    const tx = await link.createSendTransaction();

    const [gasBudget] = tx.splitCoins(tx.gas, [
      tx.pure.u64(String(ZK_SEND_GAS_BUDGET)),
    ]);

    tx.transferObjects(
      [gasBudget],
      tx.pure.address(SPONSOR_WALLET[network as Network])
    );

    const tx2 = await signAndExecute({
      tx,
      suiClient,
      currentAccount,
      signTransaction,
      options: {
        showEffects: true,
      },
    });

    await waitForTx({ suiClient, digest: tx2.digest });

    throwTXIfNotSuccessful(tx2);

    onSuccess(tx2, link.getLink());
  };
};

export default useCreateLink;
