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
import ItemWrapper from './item-wrapper';

const MenuSettingsList: FC = () => {
  const { dark } = useTheme() as Theme;

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
          <Typography variant="title" size="small" color="onSurface">
            Testnet
          </Typography>
          <ToggleButton name="theme" defaultValue={dark} onChange={noop} />
        </ItemWrapper>
      </Motion>
    </>
  );
};

export default MenuSettingsList;
