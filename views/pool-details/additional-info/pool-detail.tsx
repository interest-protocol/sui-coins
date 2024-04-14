import { Box } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { propOr } from 'ramda';
import { v4 } from 'uuid';

import { useGetCoinMetadata } from '@/hooks/use-get-coin-metadata';
import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { usePool } from '@/hooks/use-pools';
import { CoinMetadataWithType } from '@/interface';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getLiquidity } from '@/views/pools/pool-card/pool-card.utils';
import { getAllSymbols } from '@/views/pools/pools.utils';

import {
  POOL_INFORMATION,
  POOL_STATISTICS,
  SVGMap,
} from './additional-info.data';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';

const PoolDetail = () => {
  const { data: poolState } = usePool('');
  const { data: coinMetadataMap } = useGetCoinMetadata(
    poolState ? [poolState.coinTypes.coinX, poolState.coinTypes.coinY] : []
  );
  const symbols = getAllSymbols(poolState ? [poolState] : []);

  const { data: pricesRecord } = useGetMultipleTokenPriceBySymbol(symbols);

  if (!poolState) return <div>pool not found</div>;

  const infoData = [
    formatAddress(poolState.poolId),
    poolState.type,
    poolState.isVolatile ? 'Volatile' : 'Stable',
  ];

  const liquidity = getLiquidity(
    poolState,
    coinMetadataMap || {},
    pricesRecord || {}
  );

  const virtualPrice = liquidity
    ? FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(liquidity, 18).div(poolState.lpCoinSupply),
        18
      )
    : 0;

  const statsData = liquidity
    ? [formatDollars(liquidity), formatDollars(virtualPrice)]
    : ['', ''];

  const coinXMetadata: CoinMetadataWithType = propOr(
    {} as typeof coinMetadataMap,
    poolState.coinTypes.coinX,
    coinMetadataMap || {}
  );

  const coinYMetadata: CoinMetadataWithType = propOr(
    {} as typeof coinMetadataMap,
    poolState.coinTypes.coinY,
    coinMetadataMap || {}
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
        {poolState && pricesRecord && (
          <>
            {[
              {
                symbol: coinXMetadata?.symbol,
                Icon: SVGMap[coinXMetadata?.symbol],
                balance: poolState.balanceX,
                decimals: poolState.decimalsX,
                price: pricesRecord[coinXMetadata?.symbol.toLocaleLowerCase()],
              },
              {
                symbol: coinYMetadata?.symbol,
                Icon: SVGMap[coinYMetadata?.symbol],
                balance: poolState.balanceY,
                decimals: poolState.decimalsY,
                price: pricesRecord[coinYMetadata?.symbol.toLocaleLowerCase()],
              },
            ].map(({ symbol, Icon, balance, decimals, price }) => (
              <ItemToken
                key={v4()}
                Icon={Icon}
                percentage="10%"
                coinName={symbol}
                value={formatMoney(FixedPointMath.toNumber(balance, decimals))}
                conversion={formatDollars(
                  FixedPointMath.toNumber(balance.times(price), decimals)
                )}
              />
            ))}
            <ItemStandard
              label="Total Supply"
              labelColor="outline"
              content={formatMoney(
                FixedPointMath.toNumber(poolState.lpCoinSupply, 0)
              )}
            />
          </>
        )}
      </Accordion>
    </Box>
  );
};

export default PoolDetail;
