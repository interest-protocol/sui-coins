import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { PoolDetailsTabsProps } from './pool-details-tabs.types';
import PoolDetailsTabsItem from './pool-details-tabs-item';

const PoolDetaislTabs: FC<PoolDetailsTabsProps> = ({
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
      borderBottom="0.01px solid #C6C6CA"
    >
      {items.map((el, index) => (
        <PoolDetailsTabsItem
          item={el}
          key={v4()}
          isSelected={index === tabIndex}
          onChange={handleChangeTab(index)}
        />
      ))}
    </Box>
  );
};

export default PoolDetaislTabs;
