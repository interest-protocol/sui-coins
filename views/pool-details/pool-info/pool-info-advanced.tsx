import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatMoney, getSymbolByType } from '@/utils';
import { isStablePool } from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_PARAMETERS } from './pool-info.data';

const AdvanceDetail: FC = () => {
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

  // STABLE
  // lpCoinSupply: bigint;
  // lpCoinDecimals: number;
  // balances: readonly bigint[];
  // initialA: bigint;
  // futureA: bigint;
  // initialATime: bigint;
  // futureATime: bigint;
  // nCoins: number;

  // VOLATILE
  // a: bigint;
  // futureA: bigint;
  // gamma: bigint;
  // initialTime: bigint;
  // futureGamma: bigint;
  // futureTime: bigint;
  // adminBalance: bigint;
  // balances: readonly bigint[];
  // d: bigint;
  // fees: VolatileFees;
  // lastPriceTimestamp: bigint;
  // lpCoinSupply: bigint;
  // maxA: bigint;
  // minA: bigint;
  // nCoins: number;
  // rebalancingParams: RebalancingParams;
  // virtualPrice: bigint;
  // xcpProfit: bigint;
  // xcpProfitA: bigint;
  // notAdjusted: boolean;
  // coinStateMap: Record<string, CoinState>;

  return (
    <Box>
      <Accordion title={POOL_PARAMETERS.title}>
        {(isStablePool(pool, pool.isStable)
          ? [
              {
                label: 'Fee In',
                content: `${FixedPointMath.toNumber(
                  BigNumber(String(pool.state.fees.feeInPercent)).times(100),
                  18
                )}%`,
              },
              {
                label: 'Fee Out',
                content: `${FixedPointMath.toNumber(
                  BigNumber(String(pool.state.fees.feeOutPercent)).times(100),
                  18
                )}%`,
              },
              {
                label: 'Initial A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.initialA)),
                  0
                ),
              },
              {
                label: 'Future A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.futureA)),
                  0
                ),
              },
            ]
          : [
              {
                label: 'Mid Fee',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.fees.midFee)),
                  18
                ),
              },
              {
                label: 'Fee Out',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.fees.outFee)),
                  18
                ),
              },
              {
                label: 'A',
                popupInfo: 'A',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.a)),
                  18
                ),
              },
              {
                label: 'Gamma',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.gamma)),
                  18
                ),
              },
              {
                label: 'Allowed Extra Profit',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.rebalancingParams.extraProfit)),
                  18
                ),
              },
              {
                label: 'Fee Gamma',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.fees.gammaFee)),
                  18
                ),
              },
              {
                label: 'Adjustment Step',
                content: FixedPointMath.toNumber(
                  BigNumber(
                    String(pool.state.rebalancingParams.adjustmentStep)
                  ),
                  18
                ),
              },
              {
                label: 'Moving Average Time',
                content: FixedPointMath.toNumber(
                  BigNumber(String(pool.state.initialTime))
                    .plus(BigNumber(String(pool.state.futureTime)))
                    .div(2),
                  18
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
