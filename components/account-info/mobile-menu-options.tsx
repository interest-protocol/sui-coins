import { Box } from '@interest-protocol/ui-kit';
import { useCurrentWallet, useDisconnectWallet } from '@mysten/dapp-kit';
import { FC } from 'react';

import { MenuSVG } from '@/svg';

import { AccountInfoProps } from './account-info.types';
import Avatar from './avatar';
import MenuOptions from './menu-options';

const AccountInfo: FC<AccountInfoProps> = ({
  menuIsOpen,
  handleOpenMenu,
  handleCloseMenu,
}) => {
  const { isConnected } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();

  const handleDisconnect = () => {
    handleCloseMenu();
    disconnect();
  };

  return (
    <Box
      gap="m"
      p="0.25rem"
      cursor="pointer"
      borderRadius="full"
      alignItems="center"
      border="0.25rem solid"
      transition="all 0.3s ease-in-out"
      borderColor="rgba(0, 83, 219, 0.16)"
      display={['flex', 'flex', 'flex', 'none']}
      onClick={menuIsOpen ? handleCloseMenu : handleOpenMenu}
      nHover={{
        bg: 'accent',
        transform: 'scale(1.15)',
      }}
    >
      {isConnected && <Avatar />}
      <Box width={['1.5rem', '1.5rem', '1.5rem', '1.5rem']} display="flex">
        <MenuSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
      </Box>
      <MenuOptions
        isMenuOpen={menuIsOpen}
        handleDisconnect={handleDisconnect}
      />
    </Box>
  );
};

export default AccountInfo;
