import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { DetaiTabsProps } from './pool-details-tabs.types';
import PoolDetailsTabsItem from './pool-details-tabs-item';

const DetaiTabs: FC<DetaiTabsProps> = ({
  items,
  defaultTabIndex = 0,
  onChangeTab,
}) => {
  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  const handleChangeTab = (index: number) => () => {
    setTabIndex(index);
    onChangeTab?.(index);
  };

  return (
    <Box
      height="3rem"
      display="flex"
      borderTopLeftRadius="inherit"
      borderTopRightRadius="inherit"
      borderBottom="1px solid"
      borderBottomColor="outlineVariant"
    >
      {items.map((item, index) => (
        <PoolDetailsTabsItem
          item={item}
          key={v4()}
          isSelected={index === tabIndex}
          onChange={handleChangeTab(index)}
        />
      ))}
    </Box>
  );
};

export default DetaiTabs;
