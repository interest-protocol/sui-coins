import { useSuiClient } from '@mysten/dapp-kit';
import { SuiObjectResponse } from '@mysten/sui.js/client';
import { getSuiObjectResponseFields } from '@polymedia/suits';
import { pathOr } from 'ramda';
import useSWR from 'swr';

import { Pool } from '@/interface';
import { makeSWRKey } from '@/utils';

import { parsePool } from './use-pools.utils';

export const usePool = (parentId: string) => {
  const client = useSuiClient();

  return useSWR<Pool | null>(
    makeSWRKey([], usePool.name + parentId),
    async () => {
      if (!parentId) return null;

      const { data } = await client.getDynamicFields({ parentId });

      if (!data.length) return null;

      const objectId = data[0].objectId;

      const { data: poolData } = await client.getObject({
        id: objectId,
        options: { showContent: true, showType: true },
      });

      if (!poolData || !poolData.content) return null;

      const fields: null | SuiObjectResponse = pathOr(
        null,
        ['content', 'fields'],
        poolData
      );

      if (!fields) return null;

      return parsePool(fields);
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};

export const usePools = (poolAddresses: string[]) => {
  const client = useSuiClient();

  return useSWR<ReadonlyArray<Pool>>(
    makeSWRKey([], usePools.name + poolAddresses),
    async () => {
      if (!poolAddresses.length) return [];

      const pools = await client.multiGetObjects({
        ids: poolAddresses,
        options: {
          showContent: true,
        },
      });

      return pools.map((x) => parsePool(getSuiObjectResponseFields(x)));
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      refreshWhenHidden: false,
    }
  );
};
