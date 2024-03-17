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
        balance: 0.0456,
        decimals: 0,
        symbol: TOKEN_SYMBOL.BNB,
        type: '',
      },
      secondToken: {
        value: '',
        balance: 0.0456,
        decimals: 0,
        symbol: TOKEN_SYMBOL.BNB,
        type: '',
      },
    },
  });

  const formWithdraw = useForm<PoolWithdrawForm>({
    defaultValues: {
      tokenLP: {
        value: '',
        balance: 0.0456,
        decimals: 0,
        symbol: 'LPs Coin',
        type: '',
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
      borderRadius="2rem"
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
