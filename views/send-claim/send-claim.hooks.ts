import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';

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

    const built = await transactionBlock.build({
      client: suiClient,
      onlyTransactionKind: true,
    });

    const transactionBlockKindBytes = btoa(
      built.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    const sponsoringResponse = await fetch('/api/v1/sponsor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: link.address,
        transactionBlockKindBytes,
        claimer: currentAccount?.address ?? address,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
      }),
    }).then((response) => response.json?.());

    if (sponsoringResponse?.error) throw new Error(sponsoringResponse?.error);

    const { signature } = await link.keypair.signTransactionBlock(
      await TransactionBlock.from(sponsoringResponse.data.bytes).build()
    );

    const data = await fetch(
      `/api/v1/sponsor/${sponsoringResponse.data.digest}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signature }),
      }
    ).then((response) => response.json?.());

    if (data?.error) throw new Error(data?.error);

    await fetch(`/api/v1/zksend?network=${network}&id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: encodeURI(url),
      }),
    });

    onSuccess(data);
  };
};
