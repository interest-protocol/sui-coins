import { Box, Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ZK_SEND_GAS_BUDGET } from '@/constants/zksend';
import { FixedPointMath } from '@/lib';
import { ZERO_BIG_NUMBER } from '@/utils';

import { ISendBulkForm } from './send-bulk.types';

const SendBulkSummary: FC = () => {
  const { control } = useFormContext<ISendBulkForm>();

  const quantity = useWatch({ control, name: 'quantity' });
  const value = useWatch({ control, name: 'object.value' });
  const symbol = useWatch({ control, name: 'object.symbol' });
  const balance = useWatch({ control, name: 'object.balance' });
  const decimals = useWatch({ control, name: 'object.decimals' });

  const displayBalance = balance
    ? `${FixedPointMath.toNumber(balance, decimals)}`
    : ZERO_BIG_NUMBER;

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
        {displayBalance ? (
          <Typography variant="body" size="medium">
            {displayBalance.toString()}
            <Typography
              size="medium"
              variant="body"
              color="outline"
              maxWidth="12ch"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              {symbol}
            </Typography>
          </Typography>
        ) : (
          '--'
        )}
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
      <Box
        py="m"
        display="flex"
        borderBottom="1px solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
      >
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
                maxWidth="15ch"
                fontWeight="bold"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
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
      <Box display="flex" justifyContent="space-between" py="m">
        <Typography variant="body" size="medium" color="outline">
          Costs
        </Typography>
        <Typography variant="body" size="medium">
          {Number(quantity) ? (
            <Typography
              as="strong"
              size="medium"
              variant="body"
              fontWeight="bold"
            >
              {FixedPointMath.toNumber(
                BigNumber(Number(quantity) * ZK_SEND_GAS_BUDGET)
              )}{' '}
              Sui
            </Typography>
          ) : (
            '--'
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default SendBulkSummary;
