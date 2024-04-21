import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { isClammPool } from '@/hooks/use-pools/use-pools.utils';
import { FixedPointMath } from '@/lib';
import { PoolForm } from '@/views/pools/pools.types';

import { SelectionFieldValues } from '../../pool-form.types';
import { getAmmXYAmount } from '../../pool-form.utils';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';
import PoolFormWithdrawReceiveType from './pool-form-withdraw-receive-type';

const PoolFormWithdrawReceive: FC = () => {
  const { control, getValues, setValue } = useFormContext<PoolForm>();
  const lpCoin = useWatch({ control, name: 'lpCoin' });

  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  const handleSelection = (newSelection: SelectionFieldValues) =>
    setCurrentSelected(newSelection);

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
      <Typography variant="body" size="large">
        2. Choose type
      </Typography>
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        <Box display="flex" gap="xl" pb="m" px="xl">
          <PoolFormWithdrawReceiveType
            label="One Coin"
            handleSelect={handleSelection}
            currentValue={currentSelected}
            type={SelectionFieldValues.OneCoin}
          />
          <PoolFormWithdrawReceiveType
            label="Balance"
            handleSelect={handleSelection}
            currentValue={currentSelected}
            type={SelectionFieldValues.Balance}
          />
        </Box>
        <PoolFormWithdrawReceiveTokens type={currentSelected} />
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;
