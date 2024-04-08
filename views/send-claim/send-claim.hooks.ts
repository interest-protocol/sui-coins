import { toB64 } from '@mysten/bcs';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';

import { ZkSendLinkWithUrl } from '../send-link/send-link.types';

export const useClaim = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();

  return async (
    { url, link }: ZkSendLinkWithUrl,
    id: string,
    address: string,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if ((!currentAccount && !address) || !link || !link.keypair)
      throw new Error('Checking params');

    const transactionBlock = link.createClaimTransaction(
      currentAccount?.address ?? address
    );

    const txbBytes = await transactionBlock.build({
      onlyTransactionKind: true,
      client: suiClient,
    });

    const sponsoredResponse = await fetch('/api/v1/sponsor/shinami', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: link.keypair.toSuiAddress(),
        txbBytes: toB64(txbBytes),
        isMainnet: network === Network.MAINNET,
      }),
    }).then((response) => response.json?.());

    const { signature: senderSignature } =
      await link.keypair.signTransactionBlock(
        await TransactionBlock.from(sponsoredResponse.txBytes).build()
      );

    const tx = await suiClient.executeTransactionBlock({
      signature: [sponsoredResponse.signature, senderSignature],
      transactionBlock: sponsoredResponse.txBytes,
      options: {
        showEffects: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
