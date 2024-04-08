import {
  TransactionArgument,
  TransactionBlock,
  TransactionObjectArgument,
} from '@mysten/sui.js/transactions';

import { Network } from '@/constants';
import { ZK_BAG_CONTRACT_IDS } from '@/constants/zksend';

import { CreateClaimTransactionArgs } from './zk-send.types';

export class ZkBag<IDs> {
  #package: string;
  #module = 'zk_bag' as const;
  ids: IDs;

  constructor(packageAddress: string, ids: IDs) {
    this.#package = packageAddress;
    this.ids = ids;
  }

  new(
    txb: TransactionBlock,
    {
      arguments: [store, receiver],
    }: {
      arguments: [
        store: TransactionObjectArgument | string,
        receiver: TransactionArgument | string,
      ];
    }
  ) {
    txb.moveCall({
      target: `${this.#package}::${this.#module}::new`,
      arguments: [
        txb.object(store),
        typeof receiver === 'string' ? txb.pure.address(receiver) : receiver,
      ],
    });
  }

  add(
    txb: TransactionBlock,
    {
      arguments: [store, receiver, item],
      typeArguments,
    }: {
      arguments: [
        store: TransactionObjectArgument | string,
        receiver: TransactionArgument | string,
        item: TransactionObjectArgument | string,
      ];
      typeArguments: [string];
    }
  ): Extract<TransactionArgument, { kind: 'Result' }> {
    return txb.moveCall({
      target: `${this.#package}::${this.#module}::add`,
      arguments: [
        txb.object(store),
        typeof receiver === 'string' ? txb.pure.address(receiver) : receiver,
        txb.object(item),
      ],
      typeArguments: typeArguments,
    });
  }

  init_claim(
    txb: TransactionBlock,
    {
      arguments: [store],
    }: {
      arguments: [store: TransactionObjectArgument | string];
    }
  ) {
    const [bag, claimProof] = txb.moveCall({
      target: `${this.#package}::${this.#module}::init_claim`,
      arguments: [txb.object(store)],
    });

    return [bag, claimProof] as const;
  }

  reclaim(
    txb: TransactionBlock,
    {
      arguments: [store, receiver],
    }: {
      arguments: [
        store: TransactionObjectArgument | string,
        receiver: TransactionArgument | string,
      ];
    }
  ) {
    const [bag, claimProof] = txb.moveCall({
      target: `${this.#package}::${this.#module}::reclaim`,
      arguments: [
        txb.object(store),
        typeof receiver === 'string' ? txb.pure.address(receiver) : receiver,
      ],
    });

    return [bag, claimProof] as const;
  }

  claim(
    txb: TransactionBlock,
    {
      arguments: [bag, claim, id],
      typeArguments,
    }: {
      arguments: [
        bag: TransactionObjectArgument | string,
        claim: Extract<TransactionArgument, { kind: 'NestedResult' }>,
        id: TransactionObjectArgument | string,
      ];
      typeArguments: [string];
    }
  ): Extract<TransactionArgument, { kind: 'Result' }> {
    return txb.moveCall({
      target: `${this.#package}::${this.#module}::claim`,
      arguments: [
        txb.object(bag),
        txb.object(claim),
        typeof id === 'string' ? txb.object(id) : id,
      ],
      typeArguments,
    });
  }

  finalize(
    txb: TransactionBlock,
    {
      arguments: [bag, claim],
    }: {
      arguments: [
        bag: TransactionObjectArgument | string,
        claim: Extract<TransactionArgument, { kind: 'NestedResult' }>,
      ];
    }
  ) {
    txb.moveCall({
      target: `${this.#package}::${this.#module}::finalize`,
      arguments: [txb.object(bag), txb.object(claim)],
    });
  }

  update_receiver(
    txb: TransactionBlock,
    {
      arguments: [bag, from, to],
    }: {
      arguments: [
        bag: TransactionObjectArgument | string,
        from: TransactionArgument | string,
        to: TransactionArgument | string,
      ];
    }
  ) {
    txb.moveCall({
      target: `${this.#package}::${this.#module}::update_receiver`,
      arguments: [
        txb.object(bag),
        typeof from === 'string' ? txb.pure.address(from) : from,
        typeof to === 'string' ? txb.pure.address(to) : to,
      ],
    });
  }
}

export const createClaimTransaction = ({
  address,
  assets,
  sender,
  reclaim,
  contracts = ZK_BAG_CONTRACT_IDS[Network.MAINNET],
}: CreateClaimTransactionArgs) => {
  const txb = new TransactionBlock();

  const contract = new ZkBag(contracts.packageId, contracts);

  txb.setSender(sender);

  const store = txb.object(contract.ids.bagStoreId);

  const [bag, proof] = reclaim
    ? contract.reclaim(txb, { arguments: [store, address] })
    : contract.init_claim(txb, { arguments: [store] });

  const objectsToTransfer = [];

  const objects = [...assets.nfts, ...assets.coins];

  for (const object of objects) {
    objectsToTransfer.push(
      contract.claim(txb, {
        arguments: [
          bag,
          proof,
          txb.receivingRef({
            version: object.version,
            digest: object.digest,
            objectId: object.objectId,
          }),
        ],
        typeArguments: [object.type],
      })
    );
  }

  contract.finalize(txb, { arguments: [bag, proof] });
  if (objectsToTransfer.length > 0) {
    txb.transferObjects(objectsToTransfer, address);
  }

  return txb;
};
