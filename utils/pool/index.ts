import { SuiClient, SuiObjectResponse } from '@mysten/sui.js/client';
import { getSuiObjectResponseFields } from '@polymedia/suits';
import BigNumber from 'bignumber.js';
import { pathOr } from 'ramda';

import { AmmPool, AmmServerPool, PoolTypeEnum } from '@/interface';

const parsePool = (x: SuiObjectResponse, poolId: string): AmmPool => ({
  poolId: poolId,
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
  poolType: PoolTypeEnum.AMM,
  isVolatile: pathOr(true, ['value', 'fields', 'volatile'], x),
});

export const getPoolCoinTypes = (poolType: string) => {
  const [coinX, coinY, lpCoin] = poolType.split('PoolState<')[1].split(',');

  return {
    coinX,
    coinY: coinY.trim(),
    lpCoin: lpCoin.trim().slice(0, -1),
  };
};

export const fetchPool = async (client: SuiClient, poolId: string) => {
  const { data } = await client.getDynamicFields({ parentId: poolId });

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

  return parsePool(fields, poolId);
};

export const fetchPools = async (
  client: SuiClient,
  poolIds: Array<string>,
  stateIds: Array<string>
) => {
  const pools = await client.multiGetObjects({
    ids: stateIds,
    options: {
      showContent: true,
    },
  });

  return pools.map((x, index) =>
    parsePool(getSuiObjectResponseFields(x), poolIds[index])
  );
};

export const convertServerPoolToClientPool = (x: AmmServerPool): AmmPool => ({
  ...x,
  adminBalanceX: BigNumber(x.adminBalanceX),
  adminBalanceY: BigNumber(x.adminBalanceY),
  balanceX: BigNumber(x.balanceX),
  balanceY: BigNumber(x.balanceY),
  lpCoinSupply: BigNumber(x.lpCoinSupply),
  fees: {
    adminFee: BigNumber(x.fees.adminFee),
    feeOut: BigNumber(x.fees.feeOut),
    feeIn: BigNumber(x.fees.feeIn),
  },
});
