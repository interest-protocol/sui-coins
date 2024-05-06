import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useReadLocalStorage } from 'usehooks-ts';

import { LOCAL_STORAGE_VERSION } from '@/constants';
import { EXCHANGE_FEE } from '@/constants/dex';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ISwapSettings } from '@/views/swap/swap.types';

import { DCAForm } from '../dca.types';
import { useAftermathRouter } from '../dca-manager/dca-manager.hooks';

const DCAPreviewModalSummary: FC = () => {
  const suiClient = useSuiClient();
  const router = useAftermathRouter();
  const currentAccount = useCurrentAccount();
  const { control } = useFormContext<DCAForm>();

  const toValue = useWatch({ control, name: 'to.value' });
  const fromValue = useWatch({ control, name: 'from.value' });
  const toUSDPrice = useWatch({ control, name: 'to.usdPrice' });
  const fromUSDPrice = useWatch({ control, name: 'from.usdPrice' });

  const route = useWatch({ control, name: 'route' });

  const settings = useReadLocalStorage<ISwapSettings>(
    `${LOCAL_STORAGE_VERSION}-sui-coins-settings`
  );

  const { data: fees, isLoading } = useSWR(
    `network-fee-${route?.spotPrice}-${currentAccount?.address}-${settings?.slippage}`,
    async () => {
      if (!route || !currentAccount || !settings) return;

      const txb = await router.getTransactionForCompleteTradeRoute({
        completeRoute: route,
        slippage: Number(settings.slippage),
        walletAddress: currentAccount.address,
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

  const priceImpact =
    fromUSDPrice && toUSDPrice
      ? ((+fromValue * fromUSDPrice) / +toValue) * toUSDPrice
      : null;

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
              {EXCHANGE_FEE * 1000}%
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
            Rebated fee
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
    </Box>
  );
};

export default DCAPreviewModalSummary;
