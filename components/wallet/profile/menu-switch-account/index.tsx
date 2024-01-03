import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from '@/components/account-info/avatar';
import { CheckmarkSVG, CopySVG } from '@/components/svg';
import { wrapperVariants } from '@/constants';

import ItemWrapper from '../../menu-settings/item-wrapper';
import { MenuSwitchAccountProps } from '../profile.types';
import MenuSwitchAccountHeader from './header';

const MenuSwitchAccount: FC<MenuSwitchAccountProps> = ({
  isOpen,
  onBack,
  handleCloseProfile,
}) => {
  const { accounts, currentAccount, selectAccount } = useWalletKit();
  const account = currentAccount ? currentAccount.address : '';

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied');
  };

  return (
    <Motion
      right="0"
      top={['0', '0', '0', '3rem']}
      overflow="visible"
      zIndex={1}
      initial="closed"
      borderRadius="m"
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      bg="container"
      variants={wrapperVariants}
      animate={isOpen ? 'open' : 'closed'}
      pointerEvents={isOpen ? 'auto' : 'none'}
      textTransform="capitalize"
      width={['100vw', '100vw', '100vw', '14.5rem']}
      height={['100vh', '100vh', '100vh', 'unset']}
      p={['xl', 'xl', 'xl', 'unset']}
    >
      <MenuSwitchAccountHeader
        handleCloseProfile={handleCloseProfile}
        onBack={onBack}
        size={accounts.length}
      />
      {accounts.map((walletAccount) => (
        <ItemWrapper
          isActive
          key={walletAccount.address}
          disabled={walletAccount.address === account}
          onClick={() => {
            if (!(walletAccount.address === account)) {
              selectAccount(walletAccount);
              onBack();
            }
          }}
        >
          <Box display="flex" alignItems="center" gap="s">
            {walletAccount.address === account && (
              <Box
                width="1rem"
                height="1rem"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="success"
                color="success"
              >
                <CheckmarkSVG
                  maxHeight="0.438rem"
                  maxWidth="0.438rem"
                  width="100%"
                />
              </Box>
            )}
            <Avatar withNameOrAddress account={walletAccount} />
          </Box>
          <Button
            isIcon
            variant="text"
            p="0 !important"
            nHover={{
              color: 'primary',
              bg: 'transparent',
            }}
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(walletAccount.address);
            }}
          >
            <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
          </Button>
        </ItemWrapper>
      ))}
    </Motion>
  );
};

export default MenuSwitchAccount;
