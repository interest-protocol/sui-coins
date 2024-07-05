import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';
import { ZkSendLinkBuilder } from '@mysten/zksend';

import { Network, SPONSOR_WALLET } from '@/constants';
import { ZK_BAG_CONTRACT_IDS, ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { FixedPointMath } from '@/lib';
import { isSui, throwTXIfNotSuccessful, waitForTx } from '@/utils';

import { ObjectField } from '../send-bulk.types';

const useCreateLink = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransaction = useSignTransaction();

  return async (
    object: ObjectField,
    quantity: number,
    onSuccess: (
      tx: SuiTransactionBlockResponse,
      links: ReadonlyArray<string>
    ) => void
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
        path: '/send/link',
        host: location.origin,
        sender: currentAccount.address,
        contract: ZK_BAG_CONTRACT_IDS[network as Network],
        network: network === Network.MAINNET ? 'mainnet' : 'testnet',
      });

      if (isSui(object.type)) link.addClaimableMist(amount);
      else link.addClaimableBalance(object.type, amount);

      return link;
    });

    const tx = await ZkSendLinkBuilder.createLinks({
      links,
      client: suiClient,
      contract: ZK_BAG_CONTRACT_IDS[network as Network],
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

    const [gasBudget] = tx.splitCoins(tx.gas, [
      tx.pure.u64(String(ZK_SEND_GAS_BUDGET * quantity)),
    ]);

    tx.transferObjects(
      [gasBudget],
      tx.pure.address(SPONSOR_WALLET[network as Network])
    );

    const { bytes, signature } = await signTransaction.mutateAsync({
      transaction: tx,
    });

    const tx2 = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
      },
    });

    throwTXIfNotSuccessful(tx2);

    await waitForTx({ suiClient, digest: tx2.digest });

    onSuccess(
      tx2,
      links.map((link) => link.getLink())
    );
  };
};

export default useCreateLink;
