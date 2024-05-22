import { SuiObjectResponse } from '@mysten/sui.js/dist/cjs/client';
import BigNumber from 'bignumber.js';
import { pathOr } from 'ramda';

import { AmmPool, PoolTypeEnum } from '@/interface';
import { getPoolCoinTypes } from '@/utils';

export const parsePool = (x: SuiObjectResponse): Omit<AmmPool, 'poolId'> => ({
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
  isVolatile: pathOr(
    true,
    ['value', 'fields', 'fees', 'fields', 'volatile'],
    x
  ),
});
