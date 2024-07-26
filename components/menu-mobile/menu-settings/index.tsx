import { Box, Motion, Tabs, Typography } from '@interest-protocol/ui-kit';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { not, toPairs } from 'ramda';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { DISPLAY_NETWORK, Network } from '@/constants';

import MenuSettingsListHeaderMobile from './header';
import ItemWrapper from './item-wrapper';

const MenuSettingsList: FC = () => {
  const [toggle, setToggle] = useState(false);

  const { selectNetwork } = useSuiClientContext();
  const closeDropdownSettingsMenu = () => setToggle(not);

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
              onChangeTab={(index) =>
                selectNetwork(
                  toPairs(DISPLAY_NETWORK).filter(
                    ([network]) => network !== Network.DEVNET
                  )[index][0]
                )
              }
              defaultTabIndex={0}
              items={toPairs(DISPLAY_NETWORK)
                .filter(([network]) => network !== Network.DEVNET)
                .map(([, name]) => (
                  <Typography variant="label" size="large" key={v4()}>
                    {name}
                  </Typography>
                ))}
            />
          </Box>
        </ItemWrapper>
      </Motion>
    </>
  );
};

export default MenuSettingsList;
