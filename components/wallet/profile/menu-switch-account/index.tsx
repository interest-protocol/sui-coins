import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { WalletAccount } from '@wallet-standard/base';
import { FC } from 'react';
import { toast } from 'react-hot-toast';

import Avatar from '@/components/account-info/avatar';
import { CheckmarkSVG, CopySVG } from '@/components/svg';
import { wrapperVariants } from '@/constants';

import ItemWrapper from '../../../menu-mobile/menu-settings/item-wrapper';
import { MenuSwitchAccountProps } from '../profile.types';
import MenuSwitchAccountHeader from './header';
const MenuSwitchAccount: FC<MenuSwitchAccountProps> = ({
  isOpen,
  onBack,
  handleCloseProfile,
}) => {
  const { accounts, selectAccount, currentAccount } = useWalletKit();

  const account = currentAccount?.address || '';

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied to the clipboard');
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
          key={walletAccount.address}
          disabled={walletAccount.address === account}
          onClick={() => {
            if (!(walletAccount.address === account)) {
              selectAccount(walletAccount);
              onBack();
            }
          }}
        >
          <Box width="100%" display="flex" justifyContent="space-between">
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
              <Avatar
                withNameOrAddress
                account={currentAccount as WalletAccount}
              />
            </Box>
            <Button
              isIcon
              variant="text"
              p="0 !important"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(walletAccount.address);
              }}
            >
              <CopySVG maxHeight="1rem" maxWidth="1rem" width="100%" />
            </Button>
          </Box>
        </ItemWrapper>
      ))}
    </Motion>
  );
};

export default MenuSwitchAccount;
