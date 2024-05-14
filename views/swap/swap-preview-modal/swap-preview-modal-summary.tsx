import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { EXCHANGE_FEE } from '@/constants/dex';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useAftermathRouter } from '../swap.hooks';
import { SwapForm } from '../swap.types';

const SwapPreviewModalSummary: FC = () => {
  const suiClient = useSuiClient();
  const router = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const { control, setValue } = useFormContext<SwapForm>();

  const route = useWatch({ control, name: 'route' });
  const toValue = useWatch({ control, name: 'to.display' });
  const fromValue = useWatch({ control, name: 'from.display' });
  const toUSDPrice = useWatch({ control, name: 'to.usdPrice' });
  const fromUSDPrice = useWatch({ control, name: 'from.usdPrice' });
  const slippage = useWatch({ control, name: 'settings.slippage' });

  const { data: fees, isLoading } = useSWR(
    `network-fee-${route?.spotPrice}-${currentAccount?.address}-${slippage}`,
    async () => {
      if (!route || !currentAccount) return;

      const txb = await router.getTransactionForCompleteTradeRoute({
        walletAddress: currentAccount.address,
        completeRoute: route,
        slippage: Number(slippage),
      });

      const inspect = await suiClient.devInspectTransactionBlock({
        transactionBlock: txb,
        sender: currentAccount.address,
      });

      const { storageRebate, ...gasStructure } = inspect.effects.gasUsed;

      setValue('readyToSwap', true);

      return [
        FixedPointMath.toNumber(
          values(gasStructure).reduce(
            (acc, value) => acc.plus(BigNumber(value)),
            ZERO_BIG_NUMBER
          )
        ),
        FixedPointMath.toNumber(BigNumber(storageRebate)),
      ];
    }
  );

  const toUSD = toUSDPrice ? +toValue * toUSDPrice : null;
  const fromUSD = fromUSDPrice ? +fromValue * fromUSDPrice : null;

  const differenceBetween = fromUSD && toUSD ? fromUSD - toUSD : null;

  const priceImpact = differenceBetween ? differenceBetween * 100 : null;

  return (
    <Box display="flex" flexDirection="column" mb="m" gap="l">
      <Box bg="surface" px="m" py="2xs" borderRadius="xs">
        <Box
          py="m"
          display="flex"
          borderBottom="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            size="medium"
            variant="body"
            opacity="0.80"
            color="#000000A3"
          >
            Price impact
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {priceImpact
                ? `${priceImpact > 0.1 ? priceImpact.toFixed(2) : '< 0.1'}%`
                : '--'}
            </Typography>
          </Box>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="#000000A3"
          >
            Exchange fee
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {EXCHANGE_FEE * 100}%
            </Typography>
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            size="medium"
            variant="body"
            opacity="0.80"
            color="#000000A3"
          >
            Network fee
          </Typography>
          <Box textAlign="right">
            {isLoading ? (
              <Box width="1rem" height="1rem" mt="-1.2rem">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : (
              <Typography size="medium" variant="body">
                {fees ? `~${fees[0] ?? 0} SUI` : '--'}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          py="m"
          display="flex"
          borderTop="1px solid"
          borderColor="outlineVariant"
          justifyContent="space-between"
        >
          <Typography
            size="medium"
            variant="body"
            opacity="0.80"
            color="#000000A3"
          >
            Storage rebate
          </Typography>
          <Box textAlign="right">
            {isLoading ? (
              <Box width="1rem" height="1rem" mt="-1.2rem">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : (
              <Typography size="medium" variant="body">
                {fees ? `~${fees[1] ?? 0} SUI` : '--'}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {!isLoading && !fees && (
        <Box
          p="s"
          gap="s"
          display="flex"
          borderRadius="xs"
          border="1px solid"
          bg="errorContainer"
          color="onErrorContainer"
          borderColor="onErrorContainer"
        >
          <DotErrorSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          <Typography variant="label" size="medium">
            ERROR: Try to increase the Slippage
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SwapPreviewModalSummary;
