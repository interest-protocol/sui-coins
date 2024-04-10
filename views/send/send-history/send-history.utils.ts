import {
  SuiObjectChange,
  SuiObjectRef,
  SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

export const findNextGasCoin = (tx: SuiTransactionBlockResponse) =>
  tx.objectChanges!.reduce(
    (acc: Array<SuiObjectRef>, objectChanged: SuiObjectChange) => {
      if (objectChanged.type !== 'mutated') return acc;
      if (!objectChanged.objectType.includes(SUI_TYPE_ARG)) return acc;

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
