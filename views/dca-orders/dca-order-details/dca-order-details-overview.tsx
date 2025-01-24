import { Box, Typography } from '@interest-protocol/ui-kit';
import { formatAddress } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { ExplorerMode } from '@/constants';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib';
import { CopySVG } from '@/svg';
import { copyToClipboard, formatMoney, ZERO_BIG_NUMBER } from '@/utils';
import { PERIODICITY } from '@/views/dca/dca.data';

import { useDCAState } from '../dca-orders-manager';
import DCAOrderDetailsOverviewLine from './dca-order-details-overview-line';
import DCAOrderDetailsOverviewUSD from './dca-order-details-overview-usd';

const DCAOrderDetailsOverview: FC = () => {
  const network = useNetwork();
  const getExplorerUrl = useGetExplorerUrl();

  const { detailedDcas, coinsMetadata, selectedId, dcaOrders } = useDCAState();

  const {
    owner,
    every,
    start,
    input,
    output,
    cooldown,
    recipient,
    lastTrade,
    timeScale,
    totalOrders,
    amountPerTrade,
    remainingOrders,
  } = detailedDcas[selectedId!];

  const executedOrders = totalOrders - remainingOrders;

  const accumulatedOutput = dcaOrders.reduce(
    (acc, { output_amount }) => acc.plus(output_amount),
    ZERO_BIG_NUMBER
  );

  const tokenIn = coinsMetadata[input];
  const tokenOut = coinsMetadata[output];

  const account = recipient || owner;

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
        <DCAOrderDetailsOverviewLine
          isFirstLine
          title="Total deposited"
          value={`${formatMoney(
            FixedPointMath.toNumber(
              BigNumber(amountPerTrade).times(totalOrders),
              tokenIn?.decimals
            )
          )} ${tokenIn?.symbol}`}
        />
        <DCAOrderDetailsOverviewLine
          title="Total spent"
          value={`${formatMoney(
            FixedPointMath.toNumber(accumulatedOutput, tokenIn?.decimals)
          )} ${tokenIn?.symbol} (${(100 * executedOrders) / totalOrders}%)`}
        />
        <DCAOrderDetailsOverviewUSD />
        <DCAOrderDetailsOverviewLine
          title="Amount per Order"
          value={`
            ${FixedPointMath.toNumber(
              BigNumber(amountPerTrade),
              tokenIn?.decimals
            )} ${tokenIn?.symbol}`}
        />
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
            Recipient
          </Typography>
          <Box display="flex" alignItems="center" gap="xs">
            <Link
              target="_blank"
              href={getExplorerUrl(account, ExplorerMode.Account)}
            >
              <Typography
                variant="body"
                size="small"
                nHover={{ textDecoration: 'underline' }}
              >
                {formatAddress(account)}
              </Typography>
            </Link>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(account);
              }}
              cursor="pointer"
            >
              <CopySVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            </Box>
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
