import { Box } from '@interest-protocol/ui-kit';
import { propOr } from 'ramda';
import { v4 } from 'uuid';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { AmmPool, CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getLiquidity } from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_INFORMATION, POOL_STATISTICS } from './pool-info.data';

const PoolDetail = () => {
  const { pool, metadata, prices, loading } = usePoolDetails();

  if (loading)
    return (
      <Box p="xl" textAlign="center">
        Loading Pool...
      </Box>
    );

  if (!pool || isClammPool(pool))
    return (
      <Box p="xl" textAlign="center">
        Pool not found
      </Box>
    );

  const infoData = [
    pool.poolId,
    pool.poolType.toLocaleUpperCase(),
    !(pool as AmmPool).isVolatile ? 'Stable' : 'Volatile',
  ];

  const liquidity = getLiquidity(pool, metadata || {}, prices || {});

  const virtualPrice = liquidity
    ? FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(liquidity).div(pool.lpCoinSupply),
        0
      )
    : 0;

  const statsData = liquidity
    ? [formatDollars(liquidity), formatDollars(virtualPrice, 9)]
    : ['', ''];

  const coinXMetadata: CoinMetadataWithType = propOr(
    {} as typeof metadata,
    pool.coinTypes.coinX,
    metadata || {}
  );

  const coinYMetadata: CoinMetadataWithType = propOr(
    {} as typeof metadata,
    pool.coinTypes.coinY,
    metadata || {}
  );

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
            {[
              {
                symbol:
                  coinXMetadata?.symbol === 'SUI'
                    ? 'MOV'
                    : coinXMetadata?.symbol,
                balance: pool.balanceX,
                decimals: pool.decimalsX,
                price:
                  prices[
                    (coinXMetadata?.symbol === 'SUI'
                      ? 'MOV'
                      : coinXMetadata.symbol
                    ).toLowerCase()
                  ] ?? 0,
                type: pool.coinTypes.coinX,
              },
              {
                type: pool.coinTypes.coinX,
                symbol: coinYMetadata?.symbol,
                balance: pool.balanceY,
                decimals: pool.decimalsY,
                price:
                  prices[
                    (coinYMetadata?.symbol === 'SUI'
                      ? 'MOV'
                      : coinYMetadata.symbol
                    ).toLowerCase()
                  ] ?? 0,
              },
            ].map(({ type, symbol, balance, decimals, price }) => (
              <ItemToken
                key={v4()}
                percentage={
                  (+(
                    (FixedPointMath.toNumber(balance.times(price), decimals) /
                      liquidity) *
                    100
                  ).toFixed(2)).toPrecision() + '%'
                }
                symbol={symbol}
                type={type}
                value={formatMoney(FixedPointMath.toNumber(balance, decimals))}
                conversion={
                  price
                    ? formatDollars(
                        FixedPointMath.toNumber(balance.times(price), decimals)
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

export default PoolDetail;
