import { Box, TextField } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { IAirdropForm } from '../../../airdrop.types';

const AirdropCustomAmountTextField: FC = () => {
  const { network } = useSuiClientContext();
  const { register, setValue, getValues } = useFormContext<IAirdropForm>();

  return (
    <Box>
      <TextField
        placeholder="0"
        nPlaceholder={{ opacity: 0.7 }}
        {...register('commonAmount', {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            const value = parseInputEventToNumberString(v);
            setValue('commonAmount', value || '');

            const amountForAll = getValues('amountForAll');
            const airdropList = getValues('airdropList')?.map(
              ({ address }) => ({
                address,
                amount: FixedPointMath.toBigNumber(
                  value || '0',
                  getValues('token.decimals')
                )
                  .div(
                    !amountForAll ? 1 : (getValues('airdropList')?.length ?? 1)
                  )
                  .decimalPlaces(0)
                  .toString(),
              })
            );

            setValue('airdropList', airdropList ?? null);
          },
        })}
        fieldProps={{
          mt: 's',
          flex: 1,
          borderRadius: 'xs',
        }}
        Prefix={
          <TokenIcon
            withBg
            rounded
            size="1rem"
            network={network as Network}
            type={getValues('token.type')}
            symbol={getValues('token.symbol')}
            url={getValues('token.metadata.iconUrl')}
          />
        }
      />
    </Box>
  );
};

export default AirdropCustomAmountTextField;
