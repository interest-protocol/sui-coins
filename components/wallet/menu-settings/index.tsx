import {
  Motion,
  Theme,
  ToggleButton,
  Typography,
  useTheme,
} from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { noop } from '@/utils';

import MenuSettingsListHeaderMobile from './header';
import MenuItemWrapper from './item-wrapper';

const MenuSettingsList: FC = () => {
  const { dark } = useTheme() as Theme;

  const [toggle, setToggle] = useState(true);

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
        animate={{ height: toggle ? 'auto' : '0' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <MenuItemWrapper isActive={toggle}>
          <Typography variant="title" size="medium" color="onSurface">
            Testnet
          </Typography>
          <ToggleButton name="theme" defaultValue={dark} onChange={noop} />
        </MenuItemWrapper>
      </Motion>
    </>
  );
};

export default MenuSettingsList;
