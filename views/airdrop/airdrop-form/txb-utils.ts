import { bcs } from '@mysten/bcs';
import {
  SuiObjectChangeCreated,
  SuiObjectRef,
  SuiObjectResponse,
  SuiTransactionBlockResponse,
} from '@mysten/sui/client';
import {
  fromHEX,
  normalizeSuiAddress,
  SUI_TYPE_ARG,
  toHEX,
} from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { pathOr, prop } from 'ramda';

import { isSameAddress, signAndExecute } from '@/utils';
import { SendAirdropArgs } from '@/views/airdrop/airdrop.types';

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
  tx,
  contractPackageId,
  tokenType,
  coinToSend,
  batch,
  currentAccount,
  signTransaction,
}: SendAirdropArgs) => {
  tx.moveCall({
    target: `${contractPackageId}::airdrop::send`,
    typeArguments: [tokenType],
    arguments: [
      coinToSend,
      tx.pure(
        bcs
          .vector(
            bcs.bytes(32).transform({
              // To change the input type, you need to provide a type definition for the input
              input: (val: string) => fromHEX(val),
              output: (val) => toHEX(val),
            })
          )
          .serialize(batch.map((x) => normalizeSuiAddress(x.address)))
          .toBytes()
      ),
      tx.pure(
        bcs
          .vector(bcs.u64())
          .serialize(
            batch.map((x) => BigNumber(x.amount).decimalPlaces(0).toString())
          )
          .toBytes()
      ),
    ],
  });

  return signAndExecute({
    suiClient,
    tx,
    currentAccount,
    signTransaction,
    options: {
      showObjectChanges: true,
    },
  });
};

export const suiObjectReducer =
  (address: string) =>
  (
    acc: ReadonlyArray<SuiObjectRef>,
    object: SuiObjectChangeCreated
  ): ReadonlyArray<SuiObjectRef> => {
    if (!object.objectType.includes(SUI_TYPE_ARG)) return acc;

    if (!isSameAddress(pathOr('', ['owner', 'AddressOwner'], object), address))
      return acc;

    return [
      ...acc,
      {
        objectId: object.objectId,
        version: object.version,
        digest: object.digest,
      },
    ];
  };

export const getCreatedCoinInfo = (
  object: SuiObjectResponse
): SuiObjectRef => ({
  objectId: pathOr('', ['data', 'objectId'], object),
  version: pathOr('', ['data', 'version'], object),
  digest: pathOr('', ['data', 'digest'], object),
});
