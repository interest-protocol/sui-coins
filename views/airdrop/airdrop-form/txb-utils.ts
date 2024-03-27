import {
  SuiObjectChange,
  SuiObjectResponse,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { normalizeSuiAddress } from '@mysten/sui.js/utils';
import BigNumber from 'bignumber.js';
import { pathOr, prop } from 'ramda';

import { TREASURY } from '@/constants';
import { AIRDROP_SUI_FEE_PER_ADDRESS } from '@/constants/fees';
import { signAndExecute } from '@/utils';
import {
  CreatedCoinInfo,
  SendAirdropArgs,
  SuiCreateObject,
} from '@/views/airdrop/airdrop.types';

import { isSameAddress } from './../../../utils/address/index';

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

const isCreatedObject = (object: SuiObjectChange): object is SuiCreateObject =>
  object.type === 'created';

export const createdCoinIdsReducer =
  (address: string) =>
  (
    acc: ReadonlyArray<string>,
    object: SuiObjectChange
  ): ReadonlyArray<string> => {
    if (!isCreatedObject(object)) return acc;

    if (!isSameAddress(pathOr('', ['owner', 'AddressOwner'], object), address))
      return acc;

    return [...acc, object.objectId];
  };

export const getCreatedCoinInfo = (
  object: SuiObjectResponse
): CreatedCoinInfo => ({
  objectId: pathOr('', ['data', 'objectId'], object),
  version: pathOr('', ['data', 'version'], object),
  digest: pathOr('', ['data', 'digest'], object),
});
