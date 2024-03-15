import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TOKEN_SYMBOL } from '@/lib';

import PoolDeposit from './deposit';
import {
  PoolDepositForm,
  PoolOption,
  PoolWithdrawForm,
} from './pool-form.types';
import PoolWithDraw from './withdraw';

const PoolForm: FC = () => {
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const formDeposit = useForm<PoolDepositForm>({
    defaultValues: {
      firstToken: {
        value: '',
        decimals: 0,
        symbol: TOKEN_SYMBOL.BNB,
        type: '' as `0x${string}`,
      },
      secondToken: {
        value: '',
        decimals: 0,
        symbol: TOKEN_SYMBOL.BNB,
        type: '' as `0x${string}`,
      },
    },
  });

  const formWithdraw = useForm<PoolWithdrawForm>({
    defaultValues: {
      tokenLP: {
        value: '',
        decimals: 0,
        symbol: 'LPs Coin',
        type: '' as `0x${string}`,
      },
    },
  });

  const handleOptionTab = (index: PoolOption) => {
    setPoolOptionView(index);
  };
  return (
    <Box
      display="flex"
      p={['m', 'm', 'm', '4xl']}
      flexDirection="column"
      bg="lowestContainer"
      borderRadius="xs"
      gap="1.5rem"
    >
      <Box overflowX="auto">
        <Tabs
          type="circle"
          onChangeTab={handleOptionTab}
          items={['Deposit', 'Withdraw']}
          defaultTabIndex={poolOptionView}
        />
      </Box>
      {poolOptionView == PoolOption.Deposit ? (
        <FormProvider {...formDeposit}>
          <PoolDeposit />
        </FormProvider>
      ) : (
        <FormProvider {...formWithdraw}>
          <PoolWithDraw />
        </FormProvider>
      )}
    </Box>
  );
};

export default PoolForm;
