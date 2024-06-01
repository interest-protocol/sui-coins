import {
  useCurrentAccount,
  useSignTransactionBlock,
  useSuiClient,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import { ZkSendLinkBuilder } from '@mysten/zksend';

import { Network, SPONSOR_WALLET } from '@/constants';
import { ZK_BAG_CONTRACT_IDS, ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { FixedPointMath } from '@/lib';
import { isSui, throwTXIfNotSuccessful } from '@/utils';

import { ObjectField } from '../send-bulk.types';

const useCreateLink = () => {
  const suiClient = useSuiClient();
  const { network } = useSuiClientContext();
  const currentAccount = useCurrentAccount();
  const signTransactionBlock = useSignTransactionBlock();

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

    const txb = await ZkSendLinkBuilder.createLinks({
      links,
      client: suiClient,
      contract: ZK_BAG_CONTRACT_IDS[network as Network],
      network: network === Network.MAINNET ? 'mainnet' : 'testnet',
    });

    const [gasBudget] = txb.splitCoins(txb.gas, [
      txb.pure(String(ZK_SEND_GAS_BUDGET * quantity)),
    ]);

    txb.transferObjects(
      [gasBudget],
      txb.pure.address(SPONSOR_WALLET[network as Network])
    );

    const { transactionBlockBytes, signature } =
      await signTransactionBlock.mutateAsync({
        transactionBlock: txb,
      });

    const tx = await suiClient.executeTransactionBlock({
      transactionBlock: transactionBlockBytes,
      signature,
      requestType: 'WaitForLocalExecution',
      options: {
        showEffects: true,
      },
    });

    throwTXIfNotSuccessful(tx);

    onSuccess(
      tx,
      links.map((link) => link.getLink())
    );
  };
};

export default useCreateLink;
