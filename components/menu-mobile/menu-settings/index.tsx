import { Box, Motion, Tabs } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { Network } from '@/constants';
import { useNetwork } from '@/context/network';

import MenuSettingsListHeaderMobile from './header';
import ItemWrapper from './item-wrapper';

const MenuSettingsList: FC = () => {
  const { network, changeNetwork } = useNetwork();

  const [toggle, setToggle] = useState(false);

  const closeDropdownSettingsMenu = () => {
    setToggle(not);
  };

  return (
    <>
      <MenuSettingsListHeaderMobile
        handleButton={closeDropdownSettingsMenu}
        isOpen={toggle}
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
              items={['Testnet', 'Mainnet']}
              defaultTabIndex={network === Network.MAINNET ? 1 : 0}
              onChangeTab={(index) =>
                changeNetwork(index ? Network.MAINNET : Network.TESTNET)
              }
            />
          </Box>
        </ItemWrapper>
      </Motion>
    </>
  );
};

export default MenuSettingsList;
