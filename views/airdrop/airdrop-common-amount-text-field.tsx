import { Box, TextField } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { parseInputEventToNumberString } from '@/utils';

import { IAirdropForm } from './airdrop.types';

const AirdropCustomAmountTextField: FC = () => {
  const network = useNetwork();
  const { register, setValue, getValues } = useFormContext<IAirdropForm>();

  return (
    <TextField
      placeholder="0"
      nPlaceholder={{ opacity: 0.7 }}
      {...register('commonAmount', {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          const value = parseInputEventToNumberString(v);
          setValue('commonAmount', value || '');

          const airdropList = getValues('airdropList')?.map(({ address }) => ({
            address,
            amount: BigNumber(value || '0')
              .times(BigNumber(10).pow(getValues('token.decimals')))
              .toString(),
          }));

          setValue('airdropList', airdropList ?? null);
        },
      })}
      fieldProps={{
        mt: 's',
        flex: 1,
        borderRadius: 'xs',
        py: 'xl',
      }}
      Prefix={
        <Box
          mx="-0.5rem"
          width="2rem"
          height="2rem"
          bg="onSurface"
          borderRadius="xs"
          alignItems="center"
          display="inline-flex"
          color="lowestContainer"
          justifyContent="center"
        >
          <TokenIcon network={network} tokenId={getValues('token.symbol')} />
        </Box>
      }
    />
  );
};

export default AirdropCustomAmountTextField;
