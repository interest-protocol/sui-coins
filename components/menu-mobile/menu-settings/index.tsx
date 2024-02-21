import { Box, Motion, Tabs } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { noop } from '@/utils';

import MenuSettingsListHeaderMobile from './header';
import ItemWrapper from './item-wrapper';

const MenuSettingsList: FC = () => {
  const [toggle, setToggle] = useState(false);

  const closeDropdownSettingsMenu = () => {
    setToggle(not);
  };

  return (
    <>
      <MenuSettingsListHeaderMobile
        isOpen={toggle}
        handleButton={closeDropdownSettingsMenu}
      />
      <Motion
        overflow="hidden"
        animate={toggle ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <ItemWrapper>
          <Box mx="auto">
            <Tabs
              type="circle"
              items={['Mainnet', 'Testnet']}
              defaultTabIndex={0}
              onChangeTab={noop}
            />
          </Box>
        </ItemWrapper>
      </Motion>
    </>
  );
};

export default MenuSettingsList;
