import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import Header from './components/header';
import MyPosition from './my-position-section';
import { PoolTypeEnum } from './pool-list.types';
import PoolList from './pool-section';

const Pool: FC = () => {
  const [poolTypeView, setPoolTypeView] = useState<PoolTypeEnum>(
    PoolTypeEnum.Pool
  );

  const handleOptionTab = (index: PoolTypeEnum) => {
    setPoolTypeView(index);
  };

  return (
    <Box
      mx="auto"
      gap="0.5rem"
      flexDirection="column"
      gridTemplateColumns="62% 38%"
      width={['100%', '100%', '100%', '85%']}
    >
      <Box bg="lowestContainer" borderRadius="2rem" p="xl">
        <Header
          handleOptionTab={handleOptionTab}
          currentOption={poolTypeView}
        />
        {poolTypeView == PoolTypeEnum.Pool ? <PoolList /> : <MyPosition />}
      </Box>
    </Box>
  );
};

export default Pool;
