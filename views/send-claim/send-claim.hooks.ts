import { toB64 } from '@mysten/bcs';
import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { ZkSendLink } from '@mysten/zksend';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';
import { TimedSuiTransactionBlockResponse } from '@/interface';
import { throwTXIfNotSuccessful, waitForTx } from '@/utils';
import { createClaimTransaction } from '@/utils/zk-send';

export const useClaim = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();

  return async (
    link: ZkSendLink,
    address: string,
    onSuccess: (tx: TimedSuiTransactionBlockResponse) => void
  ) => {
    if ((!currentAccount && !address) || !link || !link.keypair)
      throw new Error('Checking params');

    const transactionBlock = createClaimTransaction({
      address: currentAccount?.address || address,
      sender: link.keypair!.toSuiAddress(),
      assets: link.assets,
      ...(network === Network.TESTNET && {
        contracts: ZK_BAG_CONTRACT_IDS[network as Network],
      }),
    });

    const txbBytes = await transactionBlock.build({
      onlyTransactionKind: true,
      client: suiClient,
    });

    const sponsoredResponse = await fetch('/api/auth/v1/sponsor/shinami', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: link.keypair.toSuiAddress(),
        txbBytes: toB64(txbBytes),
        isMainnet: network === Network.MAINNET,
      }),
    }).then((response) => response.json?.());

    const { signature: senderSignature } = await link.keypair.signTransaction(
      await Transaction.from(sponsoredResponse.txBytes).build()
    );

    const startTime = Date.now();

    const tx = await suiClient.executeTransactionBlock({
      signature: [sponsoredResponse.signature, senderSignature],
      transactionBlock: sponsoredResponse.txBytes,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
      },
    });

    const time = Date.now() - startTime;

    throwTXIfNotSuccessful(tx);

    await waitForTx({ suiClient, digest: tx.digest });

    onSuccess({ ...tx, time });
  };
};
