import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLinkBuilder } from '@mysten/zksend';
import { v4 } from 'uuid';

import { useNetwork } from '@/context/network';
import { isSui, throwTXIfNotSuccessful } from '@/utils';

import { SendArguments } from './send-button.types';
import { isSendCoin } from './send-button.utils';

const useCreateLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    args: SendArguments,
    onSuccess: (tx: SuiTransactionBlockResponse, id: string) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    if (!isSendCoin(args)) {
      const link = new ZkSendLinkBuilder({
        client: suiClient,
        sender: currentAccount.address,
      });

      link.addClaimableObject(args.id);

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

      fetch(`/api/v1/zksend?network=${network}`, {
        method: 'POST',
        body: JSON.stringify({
          id,
          digest: tx.digest,
          link: [link.getLink()],
        }),
      });

      onSuccess(tx, id);

      return;
    }

    const { type, amount, quantity } = args;

    if (quantity === null) {
      const link = new ZkSendLinkBuilder({
        client: suiClient,
        sender: currentAccount.address,
      });

      if (isSui(type)) link.addClaimableMist(amount);
      else link.addClaimableBalance(type, amount);

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

      fetch(`/api/v1/zksend?network=${network}`, {
        method: 'POST',
        body: JSON.stringify({
          id,
          digest: tx.digest,
          link: [link.getLink()],
        }),
      });

      onSuccess(tx, id);

      return;
    }
    const links = Array.from({ length: quantity }, () => {
      const link = new ZkSendLinkBuilder({
        client: suiClient,
        sender: currentAccount.address,
      });

      if (isSui(type)) link.addClaimableMist(amount);
      else link.addClaimableBalance(type, amount);

      return link;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const txb = await ZkSendLinkBuilder.createLinks({
      links,
    });

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

    fetch(`/api/v1/zksend?network=${network}`, {
      method: 'POST',
      body: JSON.stringify({
        id,
        digest: tx.digest,
        links: links.map((link) => link.getLink()),
      }),
    });

    onSuccess(tx, id);
  };
};

export default useCreateLink;
