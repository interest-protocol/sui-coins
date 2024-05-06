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

const AdvanceDetail: FC = () => {
  const clamm = useClammSdk();
  const { pool, metadata, loading, prices } = usePoolDetails();

  if (loading)
    return (
      <Box p="xl" textAlign="center">
        Loading Pool...
      </Box>
    );

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
                  parseBigNumberish(pool.state.fees.feeInPercent).times(100),
                  parseBigNumberish(clamm.PRECISION).e!
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
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.midFee),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Fee Out',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.outFee),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.a),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Gamma',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.gamma),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Allowed Extra Profit',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.rebalancingParams.extraProfit),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Fee Gamma',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.fees.gammaFee),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Adjustment Step',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(
                    pool.state.rebalancingParams.adjustmentStep
                  ),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
              },
              {
                label: 'Moving Average Time',
                content: FixedPointMath.toNumber(
                  parseBigNumberish(pool.state.initialTime)
                    .plus(parseBigNumberish(pool.state.futureTime))
                    .div(2),
                  parseBigNumberish(clamm.PRECISION).e!
                ),
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
