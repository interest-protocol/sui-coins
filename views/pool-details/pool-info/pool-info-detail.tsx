import { VolatilePool } from '@interest-protocol/clamm-sdk';
import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { pathOr } from 'ramda';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { WRAPPED_CONVERSION_MAP } from '@/constants/clamm';
import { useClammSdk } from '@/hooks/use-clamm-sdk';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney, parseBigNumberish } from '@/utils';
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
import PoolInfoLoading from './pool-info-loading';

const PoolInfoDetail: FC = () => {
  const clamm = useClammSdk();
  const { pool, metadata, prices, loading } = usePoolDetails();
  const [virtualPrice, setVirtualPrice] = useState(
    pool?.isStable
      ? BigNumber(0)
      : BigNumber(pathOr('0', ['state', 'virtualPrice'], pool))
  );

  const network = useNetwork();

  useEffect(() => {
    if (pool && pool.isStable) {
      clamm
        .getStablePoolVirtualPrice(pool)
        .then((vp) => setVirtualPrice(BigNumber(vp.toString())))
        .catch();
    }
  }, [pool?.isStable]);

  if (loading) return <PoolInfoLoading />;

  if (!pool || !metadata || !prices)
    return (
      <Box p="xl" textAlign="center">
        Pool not found
      </Box>
    );

  const symbol = metadata[pool.coinTypes[0]].symbol ?? '';

  const firstCoinUSDPrice = symbol ? prices[symbol.toLowerCase()] : 0;

  const infoData = [
    pool.poolObjectId,
    'CLAMM',
    pool.isStable ? 'Stable' : 'Volatile',
  ];

  const liquidity = isStablePool(pool, pool.isStable)
    ? getStableLiquidity(pool, metadata, prices)
    : getVolatileLiquidity(pool, metadata, prices);

  const statsData = [
    liquidity ? formatDollars(liquidity) : 'N/A',
    formatDollars(FixedPointMath.toNumber(virtualPrice, 18), 9),
  ];

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

              const price = prices[symbol.toLowerCase()];

              if (!pool.isStable) {
                const price =
                  (pool as VolatilePool).state.coinStateMap[
                    WRAPPED_CONVERSION_MAP[network][type] || type
                  ]?.price || 0n;
                const priceN = FixedPointMath.toNumber(
                  BigNumber(price.toString()),
                  18
                );

                const realPrice = priceN * firstCoinUSDPrice;

                return (
                  <ItemToken
                    key={v4()}
                    type={type}
                    symbol={symbol}
                    value={formatMoney(
                      FixedPointMath.toNumber(BigNumber(String(balance)), 18)
                    )}
                    conversion={
                      realPrice
                        ? formatDollars(
                            FixedPointMath.toNumber(
                              BigNumber(String(balance)).times(realPrice),
                              18
                            )
                          )
                        : 'N/A'
                    }
                    percentage={
                      realPrice
                        ? (+(
                            (FixedPointMath.toNumber(
                              parseBigNumberish(balance).times(realPrice),
                              parseBigNumberish(clamm.PRECISION).e!
                            ) /
                              liquidity) *
                            100
                          ).toFixed(2)).toPrecision() + '%'
                        : 'N/A'
                    }
                  />
                );
              }

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
                            parseBigNumberish(balance).times(price),
                            parseBigNumberish(clamm.PRECISION).e!
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
                  parseBigNumberish(pool.state.lpCoinSupply)
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
