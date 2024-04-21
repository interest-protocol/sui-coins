import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { formatMoney, getSymbolByType } from '@/utils';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import ItemStandard from './components/accordion/item-standard';
import ItemToken from './components/accordion/item-token';
import { POOL_PARAMETERS } from './pool-info.data';

const AdvanceDetail: FC = () => {
  const { pool, metadata, loading } = usePoolDetails();

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

  return (
    <Box>
      <Accordion title={POOL_PARAMETERS.title}>
        {[
          {
            label: 'Mid Fee',
            content: FixedPointMath.toNumber(pool.fees.midFee, 18),
          },
          {
            label: 'Out Fee',
            content: FixedPointMath.toNumber(pool.fees.outFee, 18),
          },
          {
            label: 'A',
            popupInfo: 'A',
            content: FixedPointMath.toNumber(pool.aGamma.a, 18),
          },
          {
            label: 'Gamma',
            content: FixedPointMath.toNumber(pool.aGamma.gamma, 18),
          },
          {
            label: 'Allowed Extra Profit',
            content: FixedPointMath.toNumber(
              pool.rebalancingParams.extraProfit,
              18
            ),
          },
          {
            label: 'Fee Gamma',
            content: FixedPointMath.toNumber(pool.fees.gammaFee, 18),
          },
          {
            label: 'Adjustment Step',
            content: FixedPointMath.toNumber(
              pool.rebalancingParams.adjustmentStep,
              18
            ),
          },
          {
            label: 'Moving Average Time',
            content: FixedPointMath.toNumber(
              pool.aGamma.initialTime.plus(pool.aGamma.futureTime).div(2),
              18
            ),
          },
        ].map(({ label, content, popupInfo }) => (
          <ItemStandard
            key={v4()}
            label={label}
            content={content}
            popupInfo={popupInfo}
          />
        ))}
      </Accordion>
      <Accordion title="Price">
        {pool.coinStates.map(({ price, decimalsScalar, type }) => (
          <ItemToken
            key={v4()}
            type={type}
            value={formatMoney(
              FixedPointMath.toNumber(price, decimalsScalar.e!)
            )}
            symbol={metadata?.[type].symbol ?? getSymbolByType(type)}
          />
        ))}
      </Accordion>
      <Accordion title="Oracle Price" noBorder>
        {pool.coinStates.map(({ priceOracle, decimalsScalar, type }) => (
          <ItemToken
            key={v4()}
            type={type}
            value={formatMoney(
              FixedPointMath.toNumber(priceOracle, decimalsScalar.e!)
            )}
            symbol={metadata?.[type].symbol ?? getSymbolByType(type)}
          />
        ))}
      </Accordion>
    </Box>
  );
};

export default AdvanceDetail;
