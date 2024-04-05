import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';

import { ISendBulkForm } from './send-bulk.types';

const SendBulkSummary: FC = () => {
  const { control } = useFormContext<ISendBulkForm>();

  const { coinsMap } = useWeb3();
  const type = useWatch({ control, name: 'object.type' });
  const balance = coinsMap[type]?.balance;
  const quantity = useWatch({ control, name: 'quantity' });
  const value = useWatch({ control, name: 'object.value' });
  const symbol = useWatch({ control, name: 'object.symbol' });
  const decimals = useWatch({ control, name: 'object.decimals' });

  const displayBalance = balance
    ? `${FixedPointMath.toNumber(balance, decimals)} ${symbol}`
    : '--';

  const displayAmountToSend =
    Number(value) && Number(quantity)
      ? `${FixedPointMath.toNumber(
          FixedPointMath.toBigNumber(value, decimals).times(Number(quantity)),
          decimals
        )} ${symbol}`
      : '--';

  return (
    <Box bg="lowContainer" px="m" borderRadius="s">
      <Box
        py="m"
        display="flex"
        borderBottom="1px solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
      >
        <Typography variant="body" size="medium" color="outline">
          Balance
        </Typography>
        <Typography variant="body" size="medium">
          {displayBalance}
        </Typography>
      </Box>
      <Box
        py="m"
        display="flex"
        borderBottom="1px solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
      >
        <Typography variant="body" size="medium" color="outline">
          Total amount to send
        </Typography>
        <Typography variant="body" size="medium">
          {displayAmountToSend}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" py="m">
        <Typography variant="body" size="medium" color="outline">
          Summary
        </Typography>
        <Typography variant="body" size="medium">
          {Number(value) && Number(quantity) ? (
            <>
              <Typography
                as="strong"
                size="medium"
                variant="body"
                fontWeight="bold"
              >
                {quantity} Link{quantity !== '1' && 's'}
              </Typography>{' '}
              with{' '}
              <Typography
                as="strong"
                size="medium"
                variant="body"
                fontWeight="bold"
              >
                {value} {symbol}
              </Typography>{' '}
              each
            </>
          ) : (
            '--'
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default SendBulkSummary;
