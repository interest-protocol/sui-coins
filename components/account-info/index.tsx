import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import { MenuSVG } from '@/svg';

import { AccountInfoProps } from './account-info.types';
import Avatar from './avatar';
import MenuOptions from './menu-options';
import SuiNetwork from './sui-network';

const AccountInfo: FC<AccountInfoProps> = ({
  menuIsOpen,
  handleOpenMenu,
  handleCloseMenu,
}) => {
  const { isConnected, disconnect } = useWalletKit();

  const handleDisconnect = () => {
    handleCloseMenu();
    disconnect();
  };

  return (
    <>
      {isConnected && (
        <Box
          gap="l"
          justifyContent="flex-end"
          display={['none', 'none', 'none', 'flex']}
        >
          <SuiNetwork />
          <Box
            gap="xs"
            px={menuIsOpen ? 's' : 'unset'}
            display="flex"
            alignItems="center"
            cursor="pointer"
            borderRadius="full"
            border="0.25rem solid"
            borderColor={menuIsOpen ? '#0053DB33' : 'transparent'}
            onClick={menuIsOpen ? handleCloseMenu : handleOpenMenu}
          >
            <Avatar withNameOrAddress />
          </Box>
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
      </Box>
      <MenuOptions
        isMenuOpen={menuIsOpen}
        handleDisconnect={handleDisconnect}
      />
    </>
  );
};

export default AccountInfo;
