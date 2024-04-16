import { SuiObjectResponse } from '@mysten/sui.js/client';
import { getSuiObjectResponseFields } from '@polymedia/suits';
import BigNumber from 'bignumber.js';
import { pathOr } from 'ramda';
import useSWR from 'swr';

import { STATE_KEY_TO_POOL_ID } from '@/constants/coins';
import { AmmPool, PoolTypeEnum } from '@/interface';
import { makeSWRKey } from '@/utils';
import { getPoolCoinTypes } from '@/utils/pool';

import { useMovementClient } from '../use-movement-client';

const parsePool = (x: SuiObjectResponse): AmmPool => ({
  poolId: STATE_KEY_TO_POOL_ID[pathOr('', ['id', 'id'], x)],
  stateId: pathOr('', ['id', 'id'], x),
  adminBalanceX: BigNumber(
    pathOr('0', ['value', 'fields', 'admin_balance_x'], x)
  ),
  adminBalanceY: BigNumber(
    pathOr('0', ['value', 'fields', 'admin_balance_y'], x)
  ),
  balanceX: BigNumber(pathOr('0', ['value', 'fields', 'balance_x'], x)),
  balanceY: BigNumber(pathOr('0', ['value', 'fields', 'balance_y'], x)),
  decimalsX: BigNumber(pathOr('0', ['value', 'fields', 'decimals_x'], x)).e!,
  decimalsY: BigNumber(pathOr('0', ['value', 'fields', 'decimals_y'], x)).e!,
  fees: {
    feeIn: BigNumber(
      pathOr('0', ['value', 'fields', 'fees', 'fields', 'fee_in_percent'], x)
    ),
    feeOut: BigNumber(
      pathOr('0', ['value', 'fields', 'fees', 'fields', 'fee_out_percent'], x)
    ),
    adminFee: BigNumber(
      pathOr('0', ['value', 'fields', 'fees', 'fields', 'admin_fee_percent'], x)
    ),
  },
  lpCoinSupply: BigNumber(
    pathOr(
      '0',
      [
        'value',
        'fields',
        'lp_coin_cap',
        'fields',
        'total_supply',
        'fields',
        'value',
      ],
      x
    )
  ),
  type: pathOr('', ['value', 'type'], x),
  coinTypes: getPoolCoinTypes(pathOr('', ['value', 'type'], x)),
  poolType: PoolTypeEnum.amm,
  isVolatile: pathOr(
    true,
    ['value', 'fields', 'fees', 'fields', 'volatile'],
    x
  ),
});

export const usePool = (parentId: string) => {
  const client = useMovementClient();

  return useSWR<AmmPool | null>(
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
  const client = useMovementClient();

  return useSWR<ReadonlyArray<AmmPool>>(
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
