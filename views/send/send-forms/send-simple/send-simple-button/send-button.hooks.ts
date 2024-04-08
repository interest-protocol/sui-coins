import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLinkBuilder } from '@mysten/zksend';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { testnetZKBagContract } from '@/constants/zksend';
import { ObjectData } from '@/context/all-objects/all-objects.types';
import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { isSui, throwTXIfNotSuccessful } from '@/utils';
import { MAINNET_CONTRACT_IDS } from '@/utils/zk-send';
import { isCoinObject } from '@/views/components/select-object-modal/select-object-modal.utils';

import { ObjectField } from '../send-simple.types';

const useCreateLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    objects: ReadonlyArray<ObjectField>,
    onSuccess: (tx: SuiTransactionBlockResponse, id: string) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const link = new ZkSendLinkBuilder({
      client: suiClient,
      path: '/send/link',
      host: location.origin,
      sender: currentAccount.address,
      contract:
        network === Network.TESTNET
          ? testnetZKBagContract
          : MAINNET_CONTRACT_IDS,
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

    const txb = await link.createSendTransaction();

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({
        transactionBlock: txb,
      });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
    });

    throwTXIfNotSuccessful(tx);

    const id = v4();

    await fetch(`/api/v1/zksend?network=${network}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        digest: tx.digest,
        links: [link.getLink()],
      }),
    });

    onSuccess(tx, id);
  };
};

export default useCreateLink;
