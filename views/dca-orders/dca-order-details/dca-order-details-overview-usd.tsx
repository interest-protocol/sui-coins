import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { FixedPointMath } from '@/lib';
import { formatDollars, ZERO_BIG_NUMBER } from '@/utils';

import { useDCAState } from '../dca-orders-manager';
import DCAOrderDetailsOverviewLine from './dca-order-details-overview-line';

const DCAOrderDetailsOverviewUSD: FC = () => {
  const { dcaOrders, detailedDcas, selectedId, coinsMetadata } = useDCAState();

  const { input } = detailedDcas[selectedId!];

  const tokenIn = coinsMetadata[input];

  const totalSpent = dcaOrders.reduce(
    (acc, { input_price, input_amount }) =>
      acc.plus(BigNumber(input_amount).times(input_price ?? 0)),
    ZERO_BIG_NUMBER
  );

  return (
    <>
      <DCAOrderDetailsOverviewLine
        title="Total Spent in $"
        value={formatDollars(
          FixedPointMath.toNumber(totalSpent, tokenIn.decimals)
        )}
      />
      <DCAOrderDetailsOverviewLine
        title="Average Price in USD"
        value={formatDollars(
          FixedPointMath.toNumber(
            totalSpent.div(dcaOrders.length ?? 1),
            tokenIn.decimals
          )
        )}
      />
    </>
  );
};

export default DCAOrderDetailsOverviewUSD;
