import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { EXCHANGE_FEE } from '@/constants/clamm';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useSwap } from '../swap.hooks';
import { SwapForm } from '../swap.types';
import { isNativeRoute } from '../swap.utils';

const SwapPreviewModalSummary: FC = () => {
  const swap = useSwap();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const fromValue = useWatch({ control, name: 'from.value' });
  const fromUSDPrice = useWatch({ control, name: 'from.usdPrice' });
  const toValue = useWatch({ control, name: 'to.display' });
  const toUSDPrice = useWatch({ control, name: 'to.usdPrice' });
  const route = useWatch({ control, name: 'route' });
  const slippage = useWatch({ control, name: 'settings.slippage' });

  const trackKey = route
    ? isNativeRoute(route)
      ? route?.routes[0][2].amount.toString()
      : route.spotPrice
    : 0;

  const {
    data: fees,
    isLoading,
    error,
  } = useSWR(
    `network-fee-${trackKey}-${currentAccount?.address}-${slippage}`,
    async () => {
      if (!route || !currentAccount) return;

      console.log(1);

      const txb = await swap(getValues());

      console.log(2);

      const inspect = await suiClient.devInspectTransactionBlock({
        transactionBlock: txb,
        sender: currentAccount.address,
      });

      console.log({ inspect });

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

  console.log({ error });

  const toUSD = toUSDPrice ? +toValue * toUSDPrice : null;
  const fromUSD = fromUSDPrice ? +fromValue * fromUSDPrice : null;

  const differenceBetween = fromUSD && toUSD ? toUSD - fromUSD : null;

  const priceImpact =
    differenceBetween && fromUSD ? (differenceBetween * 100) / fromUSD : null;

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
