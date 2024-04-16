import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';
import { useDebounceValue } from 'usehooks-ts';

import { EXCHANGE_FEE } from '@/constants';
import { FixedPointMath } from '@/lib';
import { makeSWRKey, ZERO_BIG_NUMBER } from '@/utils';
import { calculatePriceImpact } from '@/views/swap/swap.utils';

import { useSwap, useZeroSwap } from '../swap.hooks';

const SwapPreviewModalSummary: FC = () => {
  const swap = useSwap();
  const zeroSwap = useZeroSwap();
  const client = useSuiClient();
  const { control } = useFormContext();
  const currentAccount = useCurrentAccount();

  const slippage = useWatch({ control, name: 'settings.slippage' });
  const [from] = useDebounceValue(useWatch({ control, name: 'from' }), 900);
  const [to] = useDebounceValue(useWatch({ control, name: 'to' }), 900);

  const { data: fees, isLoading } = useSWR(
    makeSWRKey(
      [from, to],
      `network-fee-${currentAccount?.address}-${slippage}`
    ),
    async () => {
      if (!currentAccount) return;

      const txb = await swap();
      const zeroSwapTxb = await zeroSwap();

      const [inspect, zeroInspect] = await Promise.all([
        client.devInspectTransactionBlock({
          transactionBlock: txb,
          sender: currentAccount.address,
        }),
        client.devInspectTransactionBlock({
          transactionBlock: zeroSwapTxb,
          sender: currentAccount.address,
        }),
      ]);
      const priceImpact = calculatePriceImpact(inspect, zeroInspect);
      const { storageRebate, ...gasStructure } = inspect.effects.gasUsed;

      return [
        FixedPointMath.toNumber(
          values(gasStructure).reduce(
            (acc, value) => acc.plus(BigNumber(value)),
            ZERO_BIG_NUMBER
          )
        ),
        FixedPointMath.toNumber(BigNumber(storageRebate)),
        priceImpact,
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
            color="onSurface"
          >
            Price impact
          </Typography>
          <>
            {isLoading ? (
              <Box width="1rem" height="1rem" mt="-1.2rem">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="body"
                  size="medium"
                  color="onSurface"
                  mr="0.5rem"
                >
                  {fees
                    ? `${fees[2] > 0.1 ? fees[2].toFixed(2) : '< 0.1'}%`
                    : '--'}
                </Typography>
              </Box>
            )}
          </>
        </Box>
        <Box py="m" display="flex" justifyContent="space-between">
          <Typography
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
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
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Network fee
          </Typography>
          <Box textAlign="right">
            <Typography size="medium" variant="body" color="onSurface">
              {isLoading ? (
                <Box width="1rem" height="1rem" mt="-1.2rem">
                  <ProgressIndicator variant="loading" size={16} />
                </Box>
              ) : (
                <Typography
                  variant="body"
                  size="medium"
                  color="onSurface"
                  mr="0.5rem"
                >
                  {fees ? `~${fees[0] ?? 0} SUI` : '--'}
                </Typography>
              )}
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
            variant="body"
            size="medium"
            opacity="0.80"
            color="onSurface"
          >
            Storage rebate
          </Typography>
          <Box textAlign="right">
            <Typography size="medium" variant="body" color="onSurface">
              {isLoading ? (
                <Box width="1rem" height="1rem" mt="-1.2rem">
                  <ProgressIndicator variant="loading" size={16} />
                </Box>
              ) : (
                <Typography
                  variant="body"
                  size="medium"
                  color="onSurface"
                  mr="0.5rem"
                >
                  {fees ? `~${fees[1] ?? 0} SUI` : '--'}
                </Typography>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SwapPreviewModalSummary;
