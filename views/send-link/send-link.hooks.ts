import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SuiObjectRef, SuiTransactionBlockResponse } from '@mysten/sui/client';
import { ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS, ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { throwTXIfNotSuccessful, waitForTx } from '@/utils';
import { createClaimTransaction } from '@/utils/zk-send';

export const useLink = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();

  return useSWR<ZkSendLink>(`${location}-${network}`, () =>
    ZkSendLink.fromUrl(location.href, {
      client: suiClient,
      host: '/send/link',
      path: location.origin,
      contract: ZK_BAG_CONTRACT_IDS[network as Network],
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    })
  );
};

export const useReclaimLink = () => {
  const { network } = useSuiClientContext();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    link: ZkSendLink,
    gasObjects: Array<SuiObjectRef>,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) throw new Error('Error on current account');

    const transaction = createClaimTransaction({
      assets: link.assets,
      reclaimAddress: link.address,
      sender: currentAccount.address,
      address: currentAccount.address,
      ...(network === Network.TESTNET && {
        contracts: ZK_BAG_CONTRACT_IDS[network],
      }),
    });

    transaction.setGasPayment(gasObjects);
    transaction.setGasBudget(BigInt(ZK_SEND_GAS_BUDGET));

    const { bytes, signature } = await signTransaction.mutateAsync({
      transaction,
    });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    await waitForTx({ suiClient, digest: tx.digest });

    onSuccess(tx);
  };
};
