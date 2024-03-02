import { Box, TokenField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { useNetwork } from '@/context/network';
import { TOKEN_ICONS } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';
import { PoolDepositForm } from '@/views/pools/pools.types';

import { PoolFieldsProps } from './field.types';

const PoolField: FC<PoolFieldsProps> = ({ index }) => {
  const { network } = useNetwork();
  const { register, setValue, getValues } = useFormContext<PoolDepositForm>();

  const token = getValues(`tokenList.${index}`);

  const Icon = TOKEN_ICONS[network][token.symbol];

  return (
    <TokenField
      Label={
        token.balance && (
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
      placeholder="0"
      TokenIcon={
        Icon && (
          <Box
            color="lowestContainer"
            bg="onSurface"
            width="2.5rem"
            height="2.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="xs"
          >
            <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="100%" />
          </Box>
        )
      }
      textAlign="right"
      tokenName={token.symbol}
      labelPosition="right"
      {...register(`tokenList.${index}.value`, {
        onChange: (v: ChangeEvent<HTMLInputElement>) => {
          setValue?.(
            `tokenList.${index}.value`,
            parseInputEventToNumberString(v)
          );
        },
      })}
    />
  );
};

export default PoolField;
