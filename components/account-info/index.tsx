import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import useEventListener from '@/hooks/use-event-listener';
import { MenuSVG } from '@/svg';

import Avatar from './avatar';
import MenuOptions from './menu-options';

const BOX_ID = 'Account-Menu';

const AccountInfo: FC = () => {
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
            display="flex"
            cursor="pointer"
            borderRadius="full"
            alignItems="center"
            border="0.25rem solid"
            px={isOpen ? 's' : 'unset'}
            borderColor={isOpen ? '#0053DB33' : 'transparent'}
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
      <Box
        gap="1rem"
        p="0.25rem"
        cursor="pointer"
        borderRadius="full"
        alignItems="center"
        border="0.25rem solid"
        transition="all 0.3s ease-in-out"
        borderColor="rgba(0, 83, 219, 0.16)"
        display={['flex', 'flex', 'flex', 'none']}
        onClick={isOpen ? handleCloseMenu : handleOpenMenu}
        position="relative"
        nHover={{
          bg: 'accent',
          transform: 'scale(1.15)',
        }}
      >
        {isConnected && <Avatar />}
        <Box width={['1.5rem', '1.5rem', '1.5rem', '1.5rem']} display="flex">
          <MenuSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Box>
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']}>
        <MenuOptions isMenuOpen={isOpen} handleDisconnect={handleDisconnect} />
      </Box>
    </Box>
  );
};

export default AccountInfo;
