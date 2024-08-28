import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';
import { PERIODICITY } from '@/views/dca/dca.data';

import { DCAOrderDetailedItemProps } from '../dca-orders.types';

const DCAOrderDetailsOverview: FC<DCAOrderDetailedItemProps> = ({
  start,
  every,
  orders,
  cooldown,
  lastTrade,
  timeScale,
  totalOrders,
  amountPerTrade,
  remainingOrders,
  coins: [tokenIn, tokenOut],
}) => {
  const network = useNetwork();
  const accumulatedOutput = orders.reduce(
    (acc, { output_amount }) => acc.plus(output_amount),
    ZERO_BIG_NUMBER
  );

  return (
    <Box
      p="m"
      gap="m"
      bg="surface"
      display="flex"
      borderRadius="xs"
      flexDirection="column"
    >
      <Box
        px="l"
        py="xs"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="space-between" py="s">
          <Typography variant="body" size="medium" color="onSurface">
            DCA {tokenIn?.symbol} Balance
          </Typography>
          <Typography variant="body" size="medium">
            {formatMoney(
              FixedPointMath.toNumber(
                BigNumber(amountPerTrade).times(remainingOrders),
                tokenIn?.decimals
              )
            )}{' '}
            {tokenIn?.symbol}
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="medium" color="onSurface">
            DCA {tokenOut?.symbol} Balance
          </Typography>
          <Typography variant="body" size="medium">
            {formatMoney(
              FixedPointMath.toNumber(accumulatedOutput, tokenOut?.decimals)
            )}{' '}
            {tokenOut?.symbol}
          </Typography>
        </Box>
      </Box>
      <Box px="l">
        <Box py="s" display="flex" justifyContent="space-between">
          <Typography variant="body" size="small" color="onSurface">
            Total deposited
          </Typography>
          <Typography variant="body" size="small">
            {formatMoney(
              FixedPointMath.toNumber(
                BigNumber(amountPerTrade).times(totalOrders),
                tokenIn?.decimals
              )
            )}{' '}
            {tokenIn?.symbol}
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            Total spent
          </Typography>
          <Typography variant="body" size="small">
            {formatMoney(
              FixedPointMath.toNumber(
                BigNumber(amountPerTrade).times(orders.length),
                tokenIn?.decimals
              )
            )}{' '}
            {tokenIn?.symbol} ({(100 * orders.length) / totalOrders}%)
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            Each order size
          </Typography>
          <Typography variant="body" size="small">
            {formatMoney(
              FixedPointMath.toNumber(
                BigNumber(amountPerTrade),
                tokenIn?.decimals
              )
            )}{' '}
            {tokenIn?.symbol}
          </Typography>
        </Box>
      </Box>
      <Box my="xs" mx="l" borderTop="1px solid" borderColor="outlineVariant" />
      <Box px="l">
        <Box py="s" display="flex" justifyContent="space-between">
          <Typography variant="body" size="small" color="onSurface">
            Buying
          </Typography>
          <Box display="flex" gap="2xs" alignItems="center">
            <TokenIcon
              withBg
              rounded
              size="0.75rem"
              network={network}
              type={tokenOut?.type ?? ''}
              symbol={tokenOut?.symbol ?? ''}
            />
            <Typography variant="body" size="small">
              {tokenOut?.symbol}
            </Typography>
          </Box>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            Interval
          </Typography>
          <Typography variant="body" size="small">
            Every {every} {PERIODICITY[timeScale]}
            {every !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            # of Orders left
          </Typography>
          <Typography variant="body" size="small">
            {remainingOrders}
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            {remainingOrders ? 'Next Order' : 'Last Order'}
          </Typography>
          <Typography variant="body" size="small">
            {new Date(
              ((lastTrade || start) + (remainingOrders ? cooldown : 0)) * 1000
            ).toLocaleString()}
          </Typography>
        </Box>
        <Box
          py="s"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography variant="body" size="small" color="onSurface">
            Created
          </Typography>
          <Typography variant="body" size="small">
            {new Date(start * 1000).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DCAOrderDetailsOverview;
