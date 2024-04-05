import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';

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
    if ((!currentAccount && !address) || !link) return;

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

    const { data } = await fetch('/api/v1/sponsor', {
      method: 'POST',
      body: JSON.stringify({
        sender: link.address,
        transactionBlockKindBytes,
        claimer: currentAccount?.address ?? address,
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
      }),
    }).then((response) => response.json?.());

    await fetch(`/api/v1/zksend?network=${network}&id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        link: encodeURI(url),
      }),
    });

    onSuccess(data);
  };
};
