import { TimeScale } from '@interest-protocol/dca-sdk';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { v4 } from 'uuid';

import LinearChart from '@/components/linear-chart';
import { useIsFirstRender } from '@/hooks/use-is-first-render';
import { FixedPointMath } from '@/lib';
import { formatMoney } from '@/utils';

import { PERIODICITY, TIME_SCALE_TO_MS } from '../dca/dca.data';
import { DCAOrderDetailedItemProps } from './dca-orders.types';

const DCAOrderDetails: FC<DCAOrderDetailedItemProps> = ({
  min,
  max,
  every,
  orders,
  isOpen,
  timeScale,
  totalOrders,
  amountPerTrade,
  coins: [tokenIn, tokenOut],
}) => {
  const isFirstRender = useIsFirstRender();

  console.log({ amountPerTrade });

  const orderPrices = orders.map(
    ({ input_amount, output_amount, timestampMs }) => {
      if (!(tokenIn && tokenOut)) return { value: 0, time: 0 };

      const valueIn = FixedPointMath.toNumber(
        BigNumber(input_amount),
        tokenIn.decimals
      );

      const valueOut = FixedPointMath.toNumber(
        BigNumber(output_amount),
        tokenOut.decimals
      );

      return { value: valueIn / valueOut, time: timestampMs };
    }
  );

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
            {min
              ? `${formatMoney(
                  FixedPointMath.toNumber(
                    BigNumber(min),
                    tokenOut?.decimals ?? 0
                  )
                )} ${tokenOut?.symbol}`
              : 'N/A'}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Max Price:</b>{' '}
            {max > 0
              ? `${formatMoney(
                  FixedPointMath.toNumber(
                    BigNumber(max),
                    tokenOut?.decimals ?? 0
                  )
                )} ${tokenOut?.symbol}`
              : 'N/A'}
          </Typography>
          <Typography variant="body" size="medium">
            <b>Average Price:</b>{' '}
            {orderPrices.length
              ? `${formatMoney(
                  FixedPointMath.toNumber(
                    BigNumber(
                      orderPrices.reduce((acc, { value }) => value + acc, 0) /
                        orderPrices.length
                    ),
                    tokenOut?.decimals ?? 0
                  )
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
              orders?.[0]?.timestampMs + every * TIME_SCALE_TO_MS[timeScale]
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
          {orders.flatMap(({ timestampMs, input_amount, output_amount }) =>
            [
              timestampMs,
              FixedPointMath.toNumber(
                BigNumber(input_amount),
                tokenIn?.decimals
              ),
              Number(
                FixedPointMath.toNumber(
                  BigNumber(output_amount),
                  tokenOut?.decimals
                ).toFixed(tokenOut?.decimals)
              ).toPrecision(),
            ].map((value, index) => (
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
          data={orderPrices.map(({ time, value }) => ({
            amount: FixedPointMath.toNumber(
              BigNumber(value),
              tokenOut?.decimals ?? 0
            ),
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
