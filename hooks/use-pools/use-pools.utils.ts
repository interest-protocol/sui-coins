import { SuiObjectResponse } from '@mysten/sui.js/dist/cjs/client';
import BigNumber from 'bignumber.js';
import { not, pathOr, toPairs } from 'ramda';

import { STATE_KEY_TO_POOL_ID } from '@/constants/coins';
import { ClammPool, Pool } from '@/interface';
import { PoolTypeEnum } from '@/interface';
import { getPoolCoinTypes } from '@/utils/pool';

export const isClammPool = (pool: Pool): pool is ClammPool =>
  pool.poolType === PoolTypeEnum.clamm;

export const parsePool = (x: SuiObjectResponse): Pool => {
  if (pathOr(false, ['value', 'fields', 'admin_balance'], x))
    return {
      poolType: PoolTypeEnum.clamm,
      stateId: pathOr('', ['id', 'id'], x),
      poolId: STATE_KEY_TO_POOL_ID[pathOr('', ['id', 'id'], x)],
      isAdjusted: not(pathOr('', ['value', 'fields', 'not-adjusted'], x)),
      adminBalance: BigNumber(
        pathOr('0', ['value', 'fields', 'admin_balance'], x)
      ),
      minA: BigNumber(pathOr('0', ['value', 'fields', 'min_a'], x)),
      maxA: BigNumber(pathOr('0', ['value', 'fields', 'max_a'], x)),
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
      virtualPrice: BigNumber(
        pathOr('0', ['value', 'fields', 'virtual_price'], x)
      ),
      xcpProfit: BigNumber(pathOr('0', ['value', 'fields', 'xcp_profit'], x)),
      xcpProfitA: BigNumber(
        pathOr('0', ['value', 'fields', 'xcp_profit_a'], x)
      ),
      nCoins: BigNumber(pathOr('0', ['value', 'fields', 'n_coins'], x)),
      balances: pathOr([], ['value', 'fields', 'balances'], x).map(BigNumber),
      lastPriceTimestamp: BigNumber(
        pathOr('0', ['value', 'fields', 'n_coins'], x)
      ),
      fees: {
        midFee: BigNumber(
          pathOr('0', ['value', 'fields', 'fees', 'fields', 'mid_fee'], x)
        ),
        outFee: BigNumber(
          pathOr('0', ['value', 'fields', 'fees', 'fields', 'out_fee'], x)
        ),
        adminFee: BigNumber(
          pathOr('0', ['value', 'fields', 'fees', 'fields', 'admin_fee'], x)
        ),
        gammaFee: BigNumber(
          pathOr('0', ['value', 'fields', 'fees', 'fields', 'gamma_fee'], x)
        ),
      },
      rebalancingParams: {
        maHalfTime: BigNumber(
          pathOr(
            '0',
            ['value', 'fields', 'rebalancing_params', 'fields', 'ma_half_time'],
            x
          )
        ),
        extraProfit: BigNumber(
          pathOr(
            '0',
            ['value', 'fields', 'rebalancing_params', 'fields', 'extra_profit'],
            x
          )
        ),
        adjustmentStep: BigNumber(
          pathOr(
            '0',
            [
              'value',
              'fields',
              'rebalancing_params',
              'fields',
              'adjustment_step',
            ],
            x
          )
        ),
      },
      aGamma: {
        a: BigNumber(
          pathOr('0', ['value', 'fields', 'a_gamma', 'fields', 'a'], x)
        ),
        gamma: BigNumber(
          pathOr('0', ['value', 'fields', 'a_gamma', 'fields', 'gamma'], x)
        ),
        futureA: BigNumber(
          pathOr('0', ['value', 'fields', 'a_gamma', 'fields', 'future_a'], x)
        ),
        futureGamma: BigNumber(
          pathOr(
            '0',
            ['value', 'fields', 'a_gamma', 'fields', 'future_gamma'],
            x
          )
        ),
        initialTime: BigNumber(
          pathOr(
            '0',
            ['value', 'fields', 'a_gamma', 'fields', 'initial_time'],
            x
          )
        ),
        futureTime: BigNumber(
          pathOr(
            '0',
            ['value', 'fields', 'a_gamma', 'fields', 'initial_time'],
            x
          )
        ),
      },
      coinStates: toPairs(
        pathOr({}, ['value', 'fields', 'coin_states', 'fields'], x)
      ).map(([type, coin]: [string, any]) => ({
        type,
        index: BigNumber(pathOr('0', ['index'], coin)),
        price: BigNumber(pathOr('0', ['price'], coin)),
        typeName: pathOr('', ['decimals_scalar'], coin),
        lastPrice: BigNumber(pathOr('0', ['last_price'], coin)),
        priceOracle: BigNumber(pathOr('0', ['price_oracle'], coin)),
        decimalsScalar: BigNumber(pathOr('0', ['decimals_scalar'], coin)),
      })),
    };

  return {
    stateId: pathOr('', ['id', 'id'], x),
    poolId: STATE_KEY_TO_POOL_ID[pathOr('', ['id', 'id'], x)],
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
        pathOr(
          '0',
          ['value', 'fields', 'fees', 'fields', 'admin_fee_percent'],
          x
        )
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
  };
};
