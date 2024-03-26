import { SuiTransactionBlockResponse } from '@mysten/sui.js/src/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { prop } from 'ramda';

import { TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { signAndExecute } from '@/utils';
import { SendAirdropArgs } from '@/views/airdrop/airdrop.types';

export const chargeFee = (txb: TransactionBlock, len: number) => {
  const [fee] = txb.splitCoins(txb.gas, [
    txb.pure(
      new BigNumber(AIRDROP_SUI_FEE_PER_ADDRESS)
        .times(len)
        .decimalPlaces(0)
        .toString()
    ),
  ]);

  txb.transferObjects([fee], txb.pure(TREASURY));
};

export const findNextVersionAndDigest = (
  tx: SuiTransactionBlockResponse,
  id: string
) => {
  let nextDigest = '';
  let nextVersion = '';
  tx.objectChanges!.forEach((objectChanged: any) => {
    const objectId = prop('objectId', objectChanged);
    if (objectId === id) {
      nextDigest = prop('digest', objectChanged);
      nextVersion = prop('version', objectChanged);
    }
  });

  return [nextDigest, nextVersion];
};

export const sendAirdrop = async ({
  suiClient,
  txb,
  contractPackageId,
  tokenType,
  coinToSend,
  batch,
  currentAccount,
  signTransactionBlock,
}: SendAirdropArgs) => {
  txb.moveCall({
    target: `${contractPackageId}::airdrop::send`,
    typeArguments: [tokenType],
    arguments: [
      coinToSend,
      txb.pure(batch.map((x) => normalizeSuiAddress(x.address))),
      txb.pure(
        batch.map((x) => BigNumber(x.amount).decimalPlaces(0).toString())
      ),
    ],
  });

  return signAndExecute({
    suiClient,
    txb,
    currentAccount,
    signTransactionBlock,
    options: {
      showObjectChanges: true,
    },
  });
};
