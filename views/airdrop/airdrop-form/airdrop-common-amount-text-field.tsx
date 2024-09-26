import { TextField } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import BigNumber from 'bignumber.js';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { parseInputEventToNumberString } from '@/utils';

import { IAirdropForm } from '../airdrop.types';

const AirdropCustomAmountTextField: FC = () => {
  const { network } = useSuiClientContext();
  const { register, setValue, getValues } = useFormContext<IAirdropForm>();
  const eachAddressList = getValues('eachAddressList');

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
            amount: BigNumber(
              value
                ? eachAddressList
                  ? value
                  : Number(value) / (getValues('airdropList')?.length ?? 1)
                : 0
            )
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
      }}
      Prefix={
        <TokenIcon
          withBg
          rounded
          size="1rem"
          network={network as Network}
          type={getValues('token.type')}
          symbol={getValues('token.symbol')}
        />
      }
    />
  );
};

export default AirdropCustomAmountTextField;
