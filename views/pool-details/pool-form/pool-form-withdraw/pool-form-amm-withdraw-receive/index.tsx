import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { PoolForm } from '@/views/pools/pools.types';

import { SelectionFieldValues } from '../../pool-form.types';
import { getAmmXYAmount } from '../../pool-form.utils';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';

const PoolFormWithdrawReceive: FC = () => {
  const { control, getValues, setValue } = useFormContext<PoolForm>();
  const lpCoin = useWatch({ control, name: 'lpCoin' });

  useEffect(() => {
    const { pool, tokenList } = getValues();

    if (!pool || !lpCoin || isClammPool(pool)) return;

    const amounts = getAmmXYAmount(
      FixedPointMath.toBigNumber(lpCoin.value),
      pool.balanceX,
      pool.balanceY,
      pool.lpCoinSupply
    );

    setValue(
      'tokenList',
      amounts.map((amount, index) => ({
        ...tokenList[index],
        valueBN: amount,
        value: String(FixedPointMath.toNumber(amount)),
      }))
    );
  }, [lpCoin.value]);

  return (
    <Box display="flex" flexDirection="column" gap="m">
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        <PoolFormWithdrawReceiveTokens type={SelectionFieldValues.Balance} />
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
