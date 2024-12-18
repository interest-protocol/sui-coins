import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';

import { IAirdropForm } from '../../../airdrop.types';

const PreviewTheAmount: FC = () => {
  const { control, getValues } = useFormContext();
  const [amount, amountForAll] = useWatch({
    control,
    name: ['commonAmount', 'amountForAll'],
  });

  return (
    <Typography
      p="s"
      size="medium"
      variant="label"
      border="1px solid"
      borderRadius="2xs"
      bg="warningContainer"
      color="onWarningContainer"
    >
      Amount per wallet:{' '}
      {amount
        ? +(
            amount / (amountForAll ? getValues('airdropList').length : 1)
          ).toFixed(getValues('token.decimals'))
        : 0}{' '}
      {getValues('token.symbol')}
    </Typography>
  );
};

const AirdropCommonAmountToggle: FC = () => {
  const { getValues, setValue } = useFormContext<IAirdropForm>();

  return (
    <Box
      p="m"
      mb="l"
      gap="s"
      bg="surface"
      display="flex"
      borderRadius="2xs"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="title" size="medium" fontWeight="500">
          Split the amount
        </Typography>
        <ToggleButton
          name="amountForAll"
          defaultValue={getValues('amountForAll')}
          onChange={() => {
            const amountForAll = !getValues('amountForAll');
            const airdropList = getValues('airdropList')?.map(
              ({ address }) => ({
                address,
                amount: FixedPointMath.toBigNumber(
                  getValues('commonAmount') || '0',
                  getValues('token.decimals')
                )
                  .div(
                    !amountForAll ? 1 : getValues('airdropList')?.length ?? 1
                  )
                  .decimalPlaces(0)
                  .toString(),
              })
            );

            setValue('amountForAll', amountForAll);
            setValue('airdropList', airdropList ?? null);
          }}
        />
      </Box>
      <Typography variant="body" size="small" color="outline">
        Activate this option to divide the amount per wallet.
      </Typography>
      <PreviewTheAmount />
    </Box>
  );
};

export default AirdropCommonAmountToggle;
