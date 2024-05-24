import {
  Box,
  ProgressIndicator,
  TokenField,
  Typography,
} from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';
import { PoolForm, PoolOption } from '@/views/pools/pools.types';

import { PoolFieldsProps } from './pool-field.types';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const network = useNetwork();
  const { coinsMap, isFetchingCoinBalances } = useWeb3();
  const { register, setValue, getValues } = useFormContext<PoolForm>();

  const isDeposit = poolOptionView === PoolOption.Deposit;

  const fieldName: `tokenList.${number}` | 'lpCoin' = isDeposit
    ? `tokenList.${index}`
    : 'lpCoin';

  const token = getValues(fieldName);

  const handleDepositLock = () => {
    if ('tokenList.0' === fieldName) {
      setValue('tokenList.0.locked', true);
      setValue('tokenList.1.locked', false);
      return;
    }
    if ('tokenList.1' === fieldName) {
      setValue('tokenList.1.locked', true);
      setValue('tokenList.0.locked', false);
      return;
    }
  };

  return (
    <TokenField
      placeholder="0"
      textAlign="right"
      disabled={!token}
      labelPosition="right"
      tokenName={token?.symbol ?? ''}
      fieldProps={{ bg: 'lowestContainer' }}
      handleMax={() => {
        if (isDeposit) handleDepositLock();

        setValue(
          `${fieldName}.value`,
          (+(coinsMap[token.type]
            ? FixedPointMath.toNumber(
                coinsMap[token.type].balance,
                token.decimals
              )
            : 0)).toPrecision()
        );
      }}
      {...register(`${fieldName}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          if (isDeposit) handleDepositLock();

          setValue(`${fieldName}.value`, parseInputEventToNumberString(v));
        },
      })}
      TokenIcon={
        token && (
          <TokenIcon
            withBg
            network={network}
            type={token.type}
            symbol={token.symbol}
          />
        )
      }
      Label={
        <Typography
          mb="xs"
          size="medium"
          variant="label"
          color="onSurface"
          textAlign="right"
          display="inline-flex"
          textTransform="uppercase"
        >
          Balance:{' '}
          <Typography size="medium" variant="label" color="primary" as="span">
            {isFetchingCoinBalances ? (
              <Box mt="-1rem" ml="s">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
            ) : token && coinsMap[token.type] ? (
              FixedPointMath.toNumber(
                coinsMap[token.type].balance,
                token.decimals
              )
            ) : (
              0
            )}
          </Typography>
        </Typography>
      }
    />
  );
};

export default PoolField;
