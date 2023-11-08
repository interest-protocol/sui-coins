import { Box } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';

import { MenuSVG, SignOutSVG } from '@/svg';

import { AccountInfoProps } from './account-info.types';
import Avatar from './avatar';
import MenuOptions from './menu-options';
import SuiBalance from './sui-balance';

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
        <Box display={['none', 'flex']} justifyContent="flex-end" gap="l">
          <SuiBalance />
          <Box display="flex" gap="xs" alignItems="center">
            <Avatar withNameOrAddress />
          </Box>
          <Box
            display="flex"
            color="error"
            alignItems="center"
            nHover={{
              bg: 'accent',
              transform: 'scale(1.3)',
            }}
            transition="all 0.3s ease-in-out"
            cursor="pointer"
            onClick={handleDisconnect}
          >
            <SignOutSVG maxWidth="1.2rem" maxHeight="1.2rem" width="1.2rem" />
          </Box>
        </Box>
      )}
      <Box
        p="0.25rem"
        display={['flex', 'none']}
        border="0.25rem solid"
        borderColor="rgba(0, 83, 219, 0.16)"
        borderRadius="full"
        gap="1rem"
        alignItems="center"
        nHover={{
          bg: 'accent',
          transform: 'scale(1.15)',
        }}
        transition="all 0.3s ease-in-out"
        cursor="pointer"
        onClick={handleOpenMenu}
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
