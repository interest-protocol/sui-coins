import { Box, TokenField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { useWeb3 } from '@/hooks';
import { FixedPointMath, TOKEN_ICONS } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';
import { PoolOption } from '@/views/pools/pools.types';

import { PoolFieldsProps } from './field.types';

const PoolField: FC<PoolFieldsProps> = ({ index, poolOptionView }) => {
  const network = useNetwork();
  const { coinsMap } = useWeb3();
  const { register, setValue, getValues } = useFormContext();

  const fieldName =
    poolOptionView === PoolOption.Deposit ? `tokenList.${index}` : 'lpCoin';

  const token = getValues(fieldName);

  const Icon = TOKEN_ICONS[network][token.symbol];

  return (
    <TokenField
      placeholder="0"
      textAlign="right"
      labelPosition="right"
      tokenName={token.symbol}
      handleMax={() =>
        setValue(
          `${fieldName}.value`,
          coinsMap[token.type]
            ? FixedPointMath.toNumber(
                coinsMap[token.type].balance,
                token.decimals
              )
            : 0
        )
      }
      {...register(`${fieldName}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
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
      fieldProps={{
        bg: 'lowestContainer',
      }}
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
              {token.balance}
            </Typography>
          </Typography>
        )
      }
    />
  );
};

export default PoolField;
