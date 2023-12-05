import { Box, Tabs, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { SuiBlackSVG } from '@/svg';

enum PoolOption {
  Deposit,
  Withdraw,
}

const PoolForm: FC = () => {
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  const handleOptionTab = (index: PoolOption) => {
    setPoolOptionView(index);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="lowestContainer"
      borderRadius="2rem"
      p="4xl"
      gap="1.5rem"
    >
      <Box>
        <Tabs
          items={['Deposit', 'Withdraw']}
          type="circle"
          defaultTabIndex={poolOptionView}
          onChangeTab={handleOptionTab}
        />
      </Box>
      <Typography
        size="large"
        variant="title"
        fontSize={['1.375rem', '1.375rem', '1.375rem', '2rem']}
      >
        I would like to{' '}
        {poolOptionView == PoolOption.Deposit ? 'Deposit' : 'Withdraw'}...
      </Typography>
      <Box>
        <TokenField tokenName="teste" TokenIcon={SuiBlackSVG} />
      </Box>
    </Box>
  );
};

export default PoolForm;
