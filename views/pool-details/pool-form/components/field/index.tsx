import { Box, TokenField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { DefaultTokenSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';
import { PoolOption } from '@/views/pools/pools.types';

import { PoolFieldsProps } from './field.types';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const { register, setValue, getValues } = useFormContext();

  const isDeposit = poolOptionView === PoolOption.Deposit;

  const fieldName = isDeposit ? `tokenList.${index}` : 'lpCoin';

  const token = getValues(fieldName);

  const Icon = token ? TOKEN_ICONS[network][token.symbol] : DefaultTokenSVG;

  const handleDepositLock = () => {
    if ('tokenList.0' === fieldName) {
      setValue('tokenList.0.locked', true);
      setValue('tokenList.1.locked', false);
    } else {
      setValue('tokenList.1.locked', true);
      setValue('tokenList.0.locked', false);
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
          coinsMap[token.type]
            ? FixedPointMath.toNumber(
                coinsMap[token.type].balance,
                token.decimals
              )
            : 0
        );
      }}
      {...register(`${fieldName}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          if (isDeposit) handleDepositLock();

          setValue(
            `${fieldName}.value`,
            parseInputEventToNumberString(
              v,
              coinsMap[token.type]
                ? FixedPointMath.toNumber(
                    coinsMap[token.type].balance,
                    token.decimals
                  )
                : 0
            )
          );
        },
      })}
      TokenIcon={
        Icon && (
          <Box
            bg="onSurface"
            width="2.5rem"
            display="flex"
            height="2.5rem"
            borderRadius="xs"
            alignItems="center"
            justifyContent="center"
            color="lowestContainer"
          >
            <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
          </Box>
        )
      }
      Label={
        poolOptionView !== PoolOption.Deposit && (
          <Typography
            mb="xs"
            size="medium"
            variant="label"
            color="onSurface"
            textAlign="right"
            textTransform="uppercase"
          >
            Balance:{' '}
            <Typography size="medium" variant="label" color="primary" as="span">
              {token?.balance}
            </Typography>
          </Typography>
        )
      }
    />
  );
};

export default PoolField;
