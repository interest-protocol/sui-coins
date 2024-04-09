import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLink } from '@mysten/zksend';
import useSWR from 'swr';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';
import { useNetwork } from '@/context/network';
import { throwTXIfNotSuccessful } from '@/utils';
import { createClaimTransaction } from '@/utils/zk-send';

export const useLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();

  return useSWR<ZkSendLink>(`${location}-${network}`, () =>
    ZkSendLink.fromUrl(location.href, {
      client: suiClient,
      host: '/send/link',
      path: location.origin,
      contract: ZK_BAG_CONTRACT_IDS[network],
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    })
  );
};

export const useReclaimLink = () => {
  const network = useNetwork();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

  return async (
    link: ZkSendLink,
    onSuccess: (tx: SuiTransactionBlockResponse) => void
  ) => {
    if (!currentAccount) return;

    const transactionBlock = createClaimTransaction({
      reclaim: true,
      address: currentAccount.address,
      sender: link.keypair!.toSuiAddress(),
      assets: link.assets,
      ...(network === Network.TESTNET && {
        contracts: ZK_BAG_CONTRACT_IDS[network],
      }),
    });

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({ transactionBlock });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(tx);
  };
};
