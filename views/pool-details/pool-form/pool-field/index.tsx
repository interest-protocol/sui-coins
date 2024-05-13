import {
  Box,
  ProgressIndicator,
  TokenField,
  Typography,
} from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { Network } from '@/constants';
import { useWeb3 } from '@/hooks/use-web3';
import { FixedPointMath } from '@/lib';
import {
  isSui,
  parseInputEventToNumberString,
  safePoolSymbolFromType,
} from '@/utils';
import { PoolForm, PoolOption } from '@/views/pools/pools.types';

import { PoolFieldsProps } from './pool-field.types';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const { network } = useSuiClientContext();
  const { coinsMap, loading } = useWeb3();
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
      tokenName={
        token?.symbol || !isDeposit ? safePoolSymbolFromType(token.type) : ''
      }
      fieldProps={{ bg: 'container' }}
      handleMax={() => {
        if (isDeposit) handleDepositLock();

        setValue(
          `${fieldName}.value`,
          (+(
            coinsMap[token.type]
              ? FixedPointMath.toNumber(
                  coinsMap[token.type].balance,
                  token.decimals
                )
              : 0
          ).toFixed(5)).toPrecision()
        );
      }}
      {...register(`${fieldName}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          if (isDeposit) handleDepositLock();

          setValue(
            `${fieldName}.value`,
            (+Number(parseInputEventToNumberString(v)).toFixed(5)).toPrecision()
          );
        },
      })}
      TokenIcon={
        <TokenIcon
          withBg
          type={token?.type ?? ''}
          network={network as Network}
          symbol={token?.symbol ?? ''}
        />
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
            {token &&
            coinsMap[isSui(token.type) ? SUI_TYPE_ARG : token.type] ? (
              FixedPointMath.toNumber(
                coinsMap[token.type].balance,
                token.decimals
              )
            ) : loading ? (
              <Box mt="-1rem" ml="s">
                <ProgressIndicator variant="loading" size={16} />
              </Box>
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
