import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { useSuiClient } from '@/hooks/use-sui-client';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import { useAftermathRouter } from '../swap-manager/swap-manager.hooks';

const SwapPreviewModalSummary: FC = () => {
  const suiClient = useSuiClient();
  const router = useAftermathRouter();
  const { currentAccount } = useWalletKit();
  const { control } = useFormContext<SwapForm>();

  const route = useWatch({ control, name: 'route' });
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

  return (
    <Box display="flex" flexDirection="column" mb="m">
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
            Exchange Rate
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              {route
                ? Number((route.spotPrice * 1000).toFixed(6)).toPrecision()
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
            <Typography
              variant="body"
              size="medium"
              color="onSurface"
              mr="0.5rem"
            >
              0.5%
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
                ~{fees?.[0] ?? 0} SUI
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
            Rebated fee
          </Typography>
          <Box textAlign="right">
            {isLoading ? (
              <Box width="1rem" height="1rem" mt="-1.2rem">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : (
              <Typography size="medium" variant="body">
                ~{fees?.[1] ?? 0} SUI
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SwapPreviewModalSummary;
