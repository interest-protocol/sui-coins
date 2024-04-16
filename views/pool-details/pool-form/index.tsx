import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolOption } from '@/views/pools/pools.types';

import { PoolDetailsFormProps } from '../pool-details.types';
import PoolDeposit from './pool-form-deposit';
import PoolWithdraw from './pool-form-withdraw';

const PoolForm: FC<PoolDetailsFormProps> = ({
  handleOptionTab,
  poolOptionView,
}) => (
  <Box
    gap="xl"
    bg="container"
    display="flex"
    borderRadius="xs"
    color="onSurface"
    flexDirection="column"
    p={['m', 'm', 'm', 'xl']}
  >
    <Box overflowX="auto">
      <Tabs
        type="circle"
        onChangeTab={handleOptionTab}
        items={['Deposit', 'Withdraw']}
        defaultTabIndex={poolOptionView}
      />
    </Box>
    {poolOptionView === PoolOption.Deposit ? (
      <PoolDeposit poolOptionView={PoolOption.Deposit} />
    ) : (
      <PoolWithdraw poolOptionView={PoolOption.Withdraw} />
    )}
  </Box>
);

export default PoolForm;
