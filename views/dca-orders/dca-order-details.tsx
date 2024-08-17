import { TimeScale } from '@interest-protocol/dca-sdk';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import LinearChart from '@/components/linear-chart';
import { useIsFirstRender } from '@/hooks/use-is-first-render';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { PERIODICITY } from '../dca/dca.data';
import { DCAOrderDetailedItemProps } from './dca-orders.types';

const DCAOrderDetails: FC<DCAOrderDetailedItemProps> = ({
  min,
  max,
  start,
  every,
  orders,
  isOpen,
  cooldown,
  lastTrade,
  timeScale,
  totalOrders,
  amountPerTrade,
  coins: [tokenIn, tokenOut],
}) => {
  const isFirstRender = useIsFirstRender();

  const orderPrices = orders.map(
    ({ input_amount, output_amount, timestampMs }) => {
      if (!(tokenIn && tokenOut)) return { valueIn: 0, price: 0, time: 0 };

      const valueIn = FixedPointMath.toNumber(
        BigNumber(input_amount),
        tokenIn.decimals
      );

      const valueOut = FixedPointMath.toNumber(
        BigNumber(output_amount),
        tokenOut.decimals
      );

      return { valueIn, price: valueIn / valueOut, time: timestampMs };
    }
  );

  const maxPrice =
    tokenOut && tokenIn
      ? FixedPointMath.toNumber(
          FixedPointMath.toBigNumber(max, tokenOut.decimals).div(
            FixedPointMath.toBigNumber(amountPerTrade, tokenIn.decimals)
          ),
          0
        )
      : null;

  const minPrice =
    tokenOut && tokenIn && Number(min)
      ? FixedPointMath.toNumber(
          FixedPointMath.toBigNumber(min, tokenOut.decimals).div(
            FixedPointMath.toBigNumber(amountPerTrade, tokenIn.decimals)
          ),
          0
        )
      : null;

  console.log({ maxPrice, minPrice });

  return (
    <Motion
      p="xl"
      gap="3xl"
      mt="-1rem"
      key={v4()}
      display="grid"
      bg="highContainer"
      overflowY="hidden"
      style={{ originY: 0 }}
      transition={{ ease: 'easeIn' }}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 2fr 2fr']}
      initial={{
        scaleY: isOpen ? 0 : 1,
        opacity: isOpen ? 1 : 0,
        height: isOpen && !isFirstRender ? 'auto' : 0,
      }}
      animate={{
        scaleY: isOpen ? 1 : 0,
        height: isOpen ? 'auto' : 0,
      }}
    >
      <Box
        p="l"
        gap="l"
        display="flex"
        borderRadius="s"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Typography variant="label" size="large">
          Order details
        </Typography>
        <Box display="flex" flexDirection="column" gap="s">
          <Typography variant="body" size="medium">
            <b>Min Price:</b>{' '}
            {minPrice ? formatMoney(minPrice, 1, true) : 'N/A'}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Max Price:</b>{' '}
            {maxPrice ? formatMoney(maxPrice, 1, true) : 'N/A'}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Average Price:</b>{' '}
            {orderPrices.length
              ? `${formatMoney(
                  orderPrices.reduce((acc, { price }) => price + acc, 0) /
                    orderPrices.length,
                  1,
                  true
                )} ${tokenOut?.symbol}`
              : 'N/A'}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Frequency:</b> {every} {PERIODICITY[timeScale]}
            {every !== 1 ? 's' : ''}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Number of orders:</b> {orders?.length ?? 0}/{totalOrders}
          </Typography>
        </Box>
      </Box>
      <Box
        p="l"
        gap="l"
        display="flex"
        borderRadius="s"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="label" size="large">
            Execution history
          </Typography>
          <Typography variant="body" size="small">
            Next:{' '}
            {new Date(
              ((lastTrade || start) + cooldown) * 1000
            ).toLocaleString()}
          </Typography>
        </Box>
        <Box display="grid" gridTemplateColumns="3fr 1fr 1fr">
          <Typography variant="label" size="medium">
            Date
          </Typography>
          <Typography variant="label" size="medium">
            Amount
          </Typography>
          <Typography variant="label" size="medium">
            Price
          </Typography>
        </Box>
        <Box
          gap="s"
          display="grid"
          overflowY="auto"
          maxHeight="13rem"
          gridTemplateColumns="3fr 1fr 1fr"
        >
          {orderPrices.flatMap(({ time, valueIn, price }) =>
            [time, valueIn, price].map((value, index) => (
              <Typography key={v4()} variant="body" size="medium">
                {index
                  ? formatMoney(Number(value))
                  : new Date(value).toLocaleString()}
              </Typography>
            ))
          )}
        </Box>
      </Box>
      <Box
        p="l"
        gap="l"
        display="flex"
        borderRadius="s"
        height="20.5rem"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box>
          <Typography variant="label" size="large">
            PERFORMANCE OVERVIEW
          </Typography>
          <Typography variant="body" size="small" color="outline">
            Over/Click on the graph to see orders details
          </Typography>
        </Box>
        <LinearChart
          data={orderPrices.map(({ time, price }) => ({
            amount: price,
            day: new Date(time)[
              timeScale > TimeScale.Day
                ? 'toLocaleDateString'
                : 'toLocaleTimeString'
            ](),
            description: new Date(time).toLocaleString(),
          }))}
        />
        <Typography variant="body" size="small">
          Number of orders: {orders.length}
        </Typography>
      </Box>
    </Motion>
  );
};

export default DCAOrderDetails;