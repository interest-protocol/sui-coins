import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { PoolOption } from '@/views/pools/pools.types';

import { PoolDetailsFormProps } from '../pool-details.types';
import PoolDeposit from './deposit';
import PoolWithdraw from './withdraw';

const PoolForm: FC<PoolDetailsFormProps> = ({
  handleOptionTab,
  poolOptionView,
}) => (
  <Box
    gap="xl"
    width="100%"
    display="flex"
    borderRadius="xs"
    color="onSurface"
    bg="container"
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
