import {
  SuiObjectChange,
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from '@mysten/sui/client';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';

export const findNextGasCoin = (
  tx: SuiTransactionBlockResponse,
  owner: string
) =>
  tx.objectChanges!.reduce(
    (acc: Array<SuiObjectRef>, objectChanged: SuiObjectChange) => {
      const type = objectChanged.type;
      if (type === 'wrapped' || type === 'deleted' || type === 'published')
        return acc;

      if (!objectChanged.objectType.includes(SUI_TYPE_ARG)) return acc;
      if ('owner' in objectChanged && objectChanged.owner !== owner) return acc;
      if ('recipient' in objectChanged && objectChanged.recipient !== owner)
        return acc;

      return [
        ...acc,
        {
          digest: objectChanged.digest,
          version: objectChanged.version,
          objectId: objectChanged.objectId,
        },
      ];
    },
    []
  );
