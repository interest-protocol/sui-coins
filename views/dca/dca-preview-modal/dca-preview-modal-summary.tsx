import { Box, ProgressIndicator, Typography } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import { EXCHANGE_FEE_PERCENTAGE } from '@/constants/fees';
import { FixedPointMath } from '@/lib';
import { DotErrorSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

import { DCAForm } from '../dca.types';

const DCAPreviewModalSummary: FC = () => {
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { control, setValue } = useFormContext<DCAForm>();

  const route = useWatch({ control, name: 'route' });
  const slippage = useWatch({ control, name: 'settings.slippage' });

  const { data: fees, isLoading } = useSWR(
    `network-fee-${currentAccount?.address}-${slippage}`,
    async () => {
      if (!route || !currentAccount) return;

      const txb = new Transaction();

      const inspect = await suiClient.devInspectTransactionBlock({
        transactionBlock: txb as any,
        sender: currentAccount.address,
      });

      const { storageRebate, ...gasStructure } = inspect.effects.gasUsed;

      setValue('readyToStartDCA', true);

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
    <Box display="flex" flexDirection="column" mb="m" gap="l">
      <Box bg="surface" px="m" py="2xs" borderRadius="xs">
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
            color="#000000A3"
          >
            Exchange fee
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography mr="s" variant="body" size="medium" color="onSurface">
              {EXCHANGE_FEE_PERCENTAGE}%
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

export default DCAPreviewModalSummary;
