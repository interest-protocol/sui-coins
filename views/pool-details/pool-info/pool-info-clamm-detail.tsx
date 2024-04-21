import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getClammLiquidity } from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_INFORMATION, POOL_STATISTICS } from './pool-info.data';

const PoolInfoClammDetail: FC = () => {
  const { pool, metadata, prices, loading } = usePoolDetails();

  if (loading)
    return (
      <Box p="xl" textAlign="center">
        Loading Pool...
      </Box>
    );

  if (!pool || !isClammPool(pool))
    return (
      <Box p="xl" textAlign="center">
        Pool not found
      </Box>
    );

  const infoData = [pool.poolId, pool.poolType.toLocaleUpperCase(), 'Volatile'];

  const liquidity = getClammLiquidity(pool);

  const virtualPrice = liquidity
    ? FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(liquidity).div(pool.lpCoinSupply),
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
            {pool.coinStates.map(({ type, index, decimalsScalar }) => (
              <ItemToken
                key={v4()}
                percentage={
                  (+(
                    (FixedPointMath.toNumber(
                      pool.balances[FixedPointMath.toNumber(index, 18)].times(
                        prices[metadata?.[type].symbol ?? '']
                      ),
                      FixedPointMath.toNumber(decimalsScalar, 18)
                    ) /
                      liquidity) *
                    100
                  ).toFixed(2)).toPrecision() + '%'
                }
                symbol={metadata?.[type].symbol ?? ''}
                type={type}
                value={formatMoney(
                  FixedPointMath.toNumber(
                    pool.balances[FixedPointMath.toNumber(index, 18)].times(
                      prices[metadata?.[type].symbol ?? '']
                    ),
                    FixedPointMath.toNumber(decimalsScalar, 18)
                  )
                )}
                conversion={
                  prices[metadata?.[type].symbol ?? '']
                    ? formatDollars(
                        FixedPointMath.toNumber(
                          pool.balances[FixedPointMath.toNumber(index, 18)]
                            .times(prices[metadata?.[type].symbol ?? ''])
                            .times(prices[metadata?.[type].symbol ?? '']),
                          FixedPointMath.toNumber(decimalsScalar, 18)
                        )
                      )
                    : 'N/A'
                }
              />
            ))}
            <ItemStandard
              label="Total Supply"
              labelColor="outline"
              content={formatMoney(FixedPointMath.toNumber(pool.lpCoinSupply))}
            />
          </>
        )}
      </Accordion>
    </Box>
  );
};

export default PoolInfoClammDetail;
