import { Box, Tabs } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import PoolDeposit from './deposit';
import { PoolOption } from './pool-form.types';

const PoolForm: FC = () => {
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const handleOptionTab = (index: PoolOption) => {
    setPoolOptionView(index);
  };

  return (
    <Box
      gap="xl"
      display="flex"
      borderRadius="xs"
      color="onSurface"
      bg="lowestContainer"
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
      {poolOptionView === PoolOption.Deposit ? <PoolDeposit /> : 'Withdraw'}
    </Box>
  );
};

export default PoolForm;
