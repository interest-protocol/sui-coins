import { Box, Motion } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

import ConnectWalletButton from '@/components/wallet/connect-wallet-button';
import { wrapperVariants } from '@/constants';
import { SignOutSVG } from '@/svg';

import Avatar from '../avatar';
import { MenuOptionsProps } from './menu-option.types';
import OptionItem from './option-item';

const MenuOptions: FC<MenuOptionsProps> = ({
  isMenuOpen,
  handleDisconnect,
}) => {
  const { asPath, push } = useRouter();
  const { isConnected } = useWalletKit();

  return (
    <Motion
      right="0"
      top="4rem"
      zIndex={4}
      initial="closed"
      borderRadius="1rem"
      position="absolute"
      bg="white"
      variants={wrapperVariants}
      animate={isMenuOpen ? 'open' : 'closed'}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}
      textTransform="capitalize"
      border="1px solid"
      borderColor="#C6C6CA"
      width="14.5rem"
      boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
    >
      {isConnected && (
        <OptionItem>
          <Avatar withNameOrAddress />
        </OptionItem>
      )}
      <OptionItem
        selected={asPath == '/'}
        onClick={() => asPath !== '/' && push('/')}
      >
        Create Coin
      </OptionItem>
      <OptionItem
        selected={asPath == '/my-coins'}
        onClick={() => asPath !== '/my-coins' && push('/my-coins')}
      >
        My Coins
      </OptionItem>
      {isConnected ? (
        <OptionItem onClick={handleDisconnect}>
          <Box display="flex" color="error">
            <SignOutSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          </Box>
          <Box color="error">Sign Out</Box>
        </OptionItem>
      ) : (
        <OptionItem>
          <ConnectWalletButton />
        </OptionItem>
      )}
    </Motion>
  );
};

export default MenuOptions;
