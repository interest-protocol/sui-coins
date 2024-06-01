import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import {
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS, ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { throwTXIfNotSuccessful } from '@/utils';
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
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    gasObjects: Array<SuiObjectRef>,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) throw new Error('Error on current account');

    const transactionBlock = createClaimTransaction({
      assets: link.assets,
      reclaimAddress: link.address,
      sender: currentAccount.address,
      address: currentAccount.address,
      ...(network === Network.TESTNET && {
        contracts: ZK_BAG_CONTRACT_IDS[network],
      }),
    });

    transactionBlock.setGasPayment(gasObjects);
    transactionBlock.setGasBudget(BigInt(ZK_SEND_GAS_BUDGET));

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({
        transactionBlock,
      });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
