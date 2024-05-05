import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import {
  getStableLiquidity,
  getVolatileLiquidity,
  isStablePool,
} from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_INFORMATION, POOL_STATISTICS } from './pool-info.data';

const PoolInfoDetail: FC = () => {
  const { pool, metadata, prices, loading } = usePoolDetails();

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

  const infoData = [
    pool.poolObjectId,
    'CLAMM',
    pool.isStable ? 'Stable' : 'Volatile',
  ];

  const liquidity = isStablePool(pool, pool.isStable)
    ? getStableLiquidity(pool, metadata, prices)
    : getVolatileLiquidity(pool, metadata, prices);

  const virtualPrice = liquidity
    ? FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(liquidity).div(
          String(pool.state.lpCoinSupply)
        ),
        0
      )
    : 0;

  const statsData = liquidity
    ? [formatDollars(liquidity), formatDollars(virtualPrice, 9)]
    : ['', ''];

  return (
    <Box>
      <Accordion title={POOL_INFORMATION.title}>
        {(
          POOL_INFORMATION.data as Array<PoolDetailAccordionItemStandardProps>
        ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
          <ItemStandard
            key={v4()}
            label={label}
            popupInfo={popupInfo}
            content={infoData[index]}
            isCopyClipBoard={isCopyClipBoard}
          />
        ))}
      </Accordion>
      <Accordion title={POOL_STATISTICS.title}>
        {(
          POOL_STATISTICS.data as Array<PoolDetailAccordionItemStandardProps>
        ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
          <ItemStandard
            key={v4()}
            label={label}
            popupInfo={popupInfo}
            content={statsData[index]}
            isCopyClipBoard={isCopyClipBoard}
          />
        ))}
      </Accordion>
      <Accordion title="Pool Composition" noBorder>
        {pool && prices && (
          <>
            {pool.coinTypes.map((type, index) => {
              const balance = pool.state.balances[index];
              const symbol = metadata[type].symbol ?? '';
              const price = prices[symbol];
              console.log({ price, symbol, balance });

              return (
                <ItemToken
                  key={v4()}
                  type={type}
                  symbol={symbol}
                  value={formatMoney(
                    FixedPointMath.toNumber(BigNumber(String(balance)), 18)
                  )}
                  conversion={
                    price
                      ? formatDollars(
                          FixedPointMath.toNumber(
                            BigNumber(String(balance)).times(price),
                            18
                          )
                        )
                      : 'N/A'
                  }
                  percentage={
                    price
                      ? (+(
                          (FixedPointMath.toNumber(
                            BigNumber(String(balance)).times(price),
                            18
                          ) /
                            liquidity) *
                          100
                        ).toFixed(2)).toPrecision() + '%'
                      : 'N/A'
                  }
                />
              );
            })}
            <ItemStandard
              label="Total Supply"
              labelColor="outline"
              content={formatMoney(
                FixedPointMath.toNumber(
                  BigNumber(String(pool.state.lpCoinSupply)),
                  18
                )
              )}
            />
          </>
        )}
      </Accordion>
    </Box>
  );
};

export default PoolInfoDetail;
