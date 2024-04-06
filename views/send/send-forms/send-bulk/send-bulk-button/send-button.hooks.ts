import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLinkBuilder } from '@mysten/zksend';
import { v4 } from 'uuid';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { FixedPointMath } from '@/lib';
import { isSui, throwTXIfNotSuccessful } from '@/utils';

import { ObjectField } from '../send-bulk.types';

const useCreateLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    object: ObjectField,
    quantity: number,
    onSuccess: (tx: SuiTransactionBlockResponse, id: string) => void
  ) => {
    if (!suiClient) throw new Error('Provider not found');
    if (!currentAccount) throw new Error('There is not an account');

    const amount = BigInt(
      FixedPointMath.toBigNumber(object.value, Number(object.decimals))
        .decimalPlaces(0)
        .toString()
    );

    const links = Array.from({ length: quantity }, () => {
      const link = new ZkSendLinkBuilder({
        client: suiClient,
        sender: currentAccount.address,
        path: '/send/link',
        host: location.origin,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
      });

      if (isSui(object.type)) link.addClaimableMist(amount);
      else link.addClaimableBalance(object.type, amount);

      return link;
    });

    const txb = await ZkSendLinkBuilder.createLinks({
      links,
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
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

    await fetch(`/api/v1/zksend?network=${network}`, {
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
