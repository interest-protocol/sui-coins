import { Box } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui.js/utils';
import { v4 } from 'uuid';

import useGetMultipleTokenPriceBySymbol from '@/hooks/use-get-multiple-token-price-by-symbol';
import { usePools } from '@/hooks/use-pools';
import { FixedPointMath } from '@/lib';
import { formatDollars, formatMoney } from '@/utils';
import { getLiquidity } from '@/views/pools/pool-card/pool-card.utils';
import { getAllSymbols } from '@/views/pools/pools.utils';

import { usePoolDetails } from '../pool-details.context';
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
  const { pool } = usePoolDetails();

  const { data: poolState } = usePools(pool ? [pool.stateKey] : []);

  const symbols = getAllSymbols(poolState || []);

  const { data: pricesRecord } = useGetMultipleTokenPriceBySymbol(symbols);
  const infoData = pool
    ? [
        formatAddress(pool.poolObjectId),
        pool.poolType,
        pool.stable ? 'Stable' : 'Volatile',
      ]
    : ['', '', ''];

  const liquidity =
    poolState && pricesRecord && pool
      ? getLiquidity(
          poolState[0],
          pool.tokens.map(
            ({ symbol }) => pricesRecord[symbol.toLocaleLowerCase()]
          )
        )
      : 0;

  const virtualPrice =
    poolState && pricesRecord && pool
      ? FixedPointMath.toNumber(
          FixedPointMath.toBigNumber(liquidity, 18).div(
            poolState[0].lpCoinSupply
          ),
          18
        )
      : 0;

  const statsData =
    poolState && pricesRecord && pool
      ? [formatDollars(liquidity), formatDollars(virtualPrice)]
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
        {poolState && pricesRecord && pool && (
          <>
            {[
              {
                symbol: pool.tokens[0].symbol,
                Icon: SVGMap[pool.tokens[0].symbol],
                balance: poolState[0].balanceX,
                decimals: poolState[0].decimalsX,
                price: pricesRecord[pool.tokens[0].symbol.toLocaleLowerCase()],
              },
              {
                symbol: pool.tokens[1].symbol,
                Icon: SVGMap[pool.tokens[1].symbol],
                balance: poolState[0].balanceY,
                decimals: poolState[0].decimalsY,
                price: pricesRecord[pool.tokens[1].symbol.toLocaleLowerCase()],
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
                FixedPointMath.toNumber(poolState[0].lpCoinSupply, 0)
              )}
            />
          </>
        )}
      </Accordion>
    </Box>
  );
};

export default PoolDetail;
