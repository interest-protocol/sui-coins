import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';

import { TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { signAndExecute } from '@/utils';
import { AirdropData, SendAirdropArgs } from '@/views/airdrop/airdrop.types';

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

export const totalBatchAmount = (batch: readonly AirdropData[]) =>
  batch
    .reduce((acc, data) => acc.plus(BigNumber(data.amount)), BigNumber(0))
    .decimalPlaces(0)
    .toString();

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
      txb.pure(batch.map((x) => x.amount)),
    ],
  });

  return signAndExecute({
    suiClient,
    txb,
    currentAccount,
    signTransactionBlock,
  });
};
