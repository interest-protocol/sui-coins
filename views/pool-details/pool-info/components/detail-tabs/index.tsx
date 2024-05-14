import { Box, Motion } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { DetailsTabsProps } from './pool-details-tabs.types';
import PoolDetailsTabsItem from './pool-details-tabs-item';

const variants = {
  collapsed: {
    height: 'auto',
  },
  rest: {
    height: 0,
  },
};

const DetailsTabs: FC<DetailsTabsProps> = ({
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
      borderBottom="1px solid"
      borderTopLeftRadius="inherit"
      borderTopRightRadius="inherit"
      borderBottomColor="outlineVariant"
    >
      {items.map((item, index) => (
        <Box width="100%" key={v4()}>
          <PoolDetailsTabsItem
            item={item}
            key={v4()}
            onChange={handleChangeTab(index)}
          />
          {tabIndex === index && (
            <Motion
              px="xl"
              initial="rest"
              variants={variants}
              animate="collapsed"
              overflow="hidden"
              borderBottom="2px solid"
              borderBottomColor="primary"
              layoutId="underline"
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default DetailsTabs;
