import { Box, ToggleButton, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';

import { IAirdropForm } from '../../airdrop.types';

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
          Amount for all
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
        Activate this option to send the divide the amount to for all the
        wallets.
      </Typography>
    </Box>
  );
};

export default AirdropCommonAmountToggle;
