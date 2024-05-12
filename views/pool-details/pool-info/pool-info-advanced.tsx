import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { FixedPointMath } from '@/lib';
import { formatMoney, getSymbolByType, parseBigNumberish } from '@/utils';
import { isStablePool } from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_PARAMETERS } from './pool-info.data';
import PoolInfoLoading from './pool-info-loading';

const AdvanceDetail: FC = () => {
  const clamm = useClammSdk();
  const { pool, metadata, loading, prices } = usePoolDetails();

  if (loading) return <PoolInfoLoading />;

  if (!pool || !metadata || !prices)
    return (
      <Box p="xl" textAlign="center">
        Pool not found
      </Box>
    );

  return (
    <Box>
      <Accordion title={POOL_PARAMETERS.title}>
        {(isStablePool(pool, pool.isStable)
          ? [
              {
                label: 'Fee In',
                content: `${FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.feeInPercent).times(100)
                )}%`,
              },
              {
                label: 'Fee Out',
                content: `${FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.feeOutPercent).times(100),
                  parseBigNumberish(clamm.PRECISION).e!
                )}%`,
              },
              {
                label: 'Initial A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.initialA),
                  0
                ),
              },
              {
                label: 'Future A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.futureA),
                  0
                ),
              },
            ]
          : [
              {
                label: 'Mid Fee',
                popupInfo: 'Trading fee when the pool is balanced',
                content: `${FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.midFee),
                  8
                )}%`,
              },
              {
                label: 'Fee Out',
                popupInfo: 'Trading fee when the pool is imbalanced',
                content: `${FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.outFee),
                  8
                )}%`,
              },
              {
                label: 'A',
                popupInfo: 'Amplifier to stabilize the pool',
                content: pool.state.a.toString(),
              },
              {
                label: 'Gamma',
                popupInfo: 'Controls overall breadth of the curve',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.gamma),
                  18
                ),
              },
              {
                label: 'Allowed Extra Profit',
                popupInfo:
                  'Excess profit (over the 50% baseline) required to allow price re-pegging',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.rebalancingParams.extraProfit),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Fee Gamma',
                popupInfo:
                  'Adjusts how quickly fees increase with greater imbalance',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.gammaFee),
                  18
                ),
              },
              {
                label: 'Adjustment Step',
                popupInfo: 'Minimum size of price scale adjustments',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(
                    pool.state.rebalancingParams.adjustmentStep
                  ),
                  18
                ),
              },
              {
                label: 'Moving Average Time',
                popupInfo:
                  'Controls the duration of the EMA internal “price oracle”',
                content: `${FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.rebalancingParams.maHalfTime),
                  3
                )}s`,
              },
            ]
        ).map(({ label, content, popupInfo }) => (
          <ItemStandard
            key={v4()}
            label={label}
            content={content}
            popupInfo={popupInfo}
          />
        ))}
      </Accordion>
      <Accordion title="Price">
        {pool.coinTypes.map((type) => (
          <ItemToken
            key={v4()}
            type={type}
            value={formatMoney(prices[metadata[type].symbol] ?? 0)}
            symbol={metadata?.[type].symbol ?? getSymbolByType(type)}
          />
        ))}
      </Accordion>
      {/* <Accordion title="Oracle Price" noBorder>
        {pool.coinTypes.map((type) => (
          <ItemToken
            key={v4()}
            type={type}
            value={formatMoney(
              FixedPointMath.toNumber(priceOracle, decimalsScalar.e!)
            )}
            symbol={metadata?.[type].symbol ?? getSymbolByType(type)}
          />
        ))}
      </Accordion> */}
    </Box>
  );
};

export default AdvanceDetail;
