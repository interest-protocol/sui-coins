import { Box, Theme, useTheme } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import useEventListener from '@/hooks/use-event-listener';

import MenuMobile from '../wallet/menu-mobile';
import Profile from '../wallet/profile';
import Avatar from './avatar';
import MenuOptions from './menu-options';

const BOX_ID = 'Account-Menu';

const AccountInfo: FC = () => {
  const { colors } = useTheme() as Theme;
  const { isConnected, disconnect } = useWalletKit();

  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseMenu();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const handleOpenMenu = () => setIsOpen(true);

  const handleCloseMenu = () => setIsOpen(false);

  useEventListener('resize', handleCloseMenu, true);

  const handleDisconnect = () => {
    handleCloseMenu();
    disconnect();
  };

  return (
    <Box
      id={BOX_ID}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      position="relative"
    >
      {isConnected && (
        <Box position="relative" display={['none', 'none', 'none', 'flex']}>
          <Box
            gap="xs"
            p="0.5rem"
            display="flex"
            cursor="pointer"
            borderRadius="0.5rem"
            alignItems="center"
            bg={isOpen ? `${colors.primary}14` : 'container'}
            transition="all 0.3s ease-in-out"
            onClick={isOpen ? handleCloseMenu : handleOpenMenu}
          >
            <Avatar withNameOrAddress />
          </Box>
          <MenuOptions
            isMenuOpen={isOpen}
            handleDisconnect={handleDisconnect}
          />
        </Box>
      )}
      <Box display={['flex', 'flex', 'flex', 'none']}>
        {isConnected && <Profile />}
        <MenuMobile />
      </Box>
    </Box>
  );
};

export default AccountInfo;
