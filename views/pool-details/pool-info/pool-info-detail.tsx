import { Box } from '@interest-protocol/ui-kit';
import { propOr } from 'ramda';
import { v4 } from 'uuid';

import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getLiquidity } from '@/views/pools/pool-card/pool-card.utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_INFORMATION, POOL_STATISTICS, SVGMap } from './pool-info.data';
import PoolInfoLoading from './pool-info-loading';

const PoolDetail = () => {
  const { pool, metadata, prices, loading } = usePoolDetails();

  if (loading) return <PoolInfoLoading />;

  const infoData = pool
    ? [
        pool.poolId ?? '',
        pool.poolType.toLocaleUpperCase() ?? '',
        pool.isVolatile ? 'Volatile' : 'Stable',
      ]
    : ['', '', ''];

  const liquidity = pool ? getLiquidity(pool, metadata || {}, prices || {}) : 0;

  const virtualPrice =
    pool && liquidity
      ? FixedPointMath.toBigNumber(liquidity, 9)
          .div(pool.lpCoinSupply)
          .toString()
      : '0';

  const statsData = liquidity
    ? [formatDollars(liquidity), formatDollars(+virtualPrice, 9)]
    : ['', ''];

  const coinXMetadata: CoinMetadataWithType = propOr(
    {} as typeof metadata,
    pool ? pool.coinTypes.coinX : '',
    metadata || {}
  );

  const coinYMetadata: CoinMetadataWithType = propOr(
    {} as typeof metadata,
    pool ? pool.coinTypes.coinY : '',
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
            loading={loading}
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
            loading={loading}
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
                    ? 'MOVE'
                    : coinXMetadata?.symbol,
                Icon: SVGMap[
                  coinXMetadata?.symbol === 'SUI'
                    ? 'MOVE'
                    : coinXMetadata?.symbol
                ],
                balance: pool.balanceX,
                decimals: pool.decimalsX,
                price:
                  prices[
                    (coinXMetadata?.symbol === 'SUI'
                      ? 'MOVE'
                      : coinXMetadata.symbol
                    ).toLowerCase()
                  ] ?? 0,
              },
              {
                symbol: coinYMetadata?.symbol,
                Icon: SVGMap[coinYMetadata?.symbol],
                balance: pool.balanceY,
                decimals: pool.decimalsY,
                price:
                  prices[
                    (coinYMetadata?.symbol === 'SUI'
                      ? 'MOVE'
                      : coinYMetadata.symbol
                    ).toLowerCase()
                  ] ?? 0,
              },
            ].map(({ symbol, Icon, balance, decimals, price }) => (
              <ItemToken
                key={v4()}
                Icon={Icon}
                percentage={
                  (+(
                    (FixedPointMath.toNumber(balance.times(price), decimals) /
                      liquidity) *
                    100
                  ).toFixed(2)).toPrecision() + '%'
                }
                coinName={symbol}
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
              loading={loading}
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
