import { Box, Button, Motion } from '@interest-protocol/ui-kit';
import {
  useAccounts,
  useCurrentAccount,
  useDisconnectWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { CheckmarkSVG, CopySVG, LogoutSVG } from '@/components/svg';

import Avatar from '../avatar';
import ItemWrapper from '../item-wrapper';
import { MenuProfileProps } from '../profile.types';
import MenuProfileItem from './profile-item';

const MenuProfile: FC<MenuProfileProps> = ({ isOpen, handleCloseProfile }) => {
  const accounts = useAccounts();
  const currentAccount = useCurrentAccount();
  const account = currentAccount?.address || '';
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: selectAccount } = useSwitchAccount();

  const copyToClipboard = (address: string) => {
    window.navigator.clipboard.writeText(address || '');
    toast('Address copied to the clipboard');
  };

  return (
    <Motion
      right="0"
      zIndex={3}
      bg="container"
      display="flex"
      borderRadius="s"
      overflow="hidden"
      flexDirection="column"
      textTransform="capitalize"
      top={['0', '0', '0', '3rem']}
      justifyContent="space-between"
      p={['xl', 'xl', 'xl', 'unset']}
      animate={isOpen ? 'open' : 'closed'}
      initial={isOpen ? 'closed' : 'open'}
      pb={['7rem', '7rem', '7rem', 'unset']}
      pointerEvents={isOpen ? 'auto' : 'none'}
      height={['100vh', '100vh', '100vh', 'unset']}
      width={['100vw', '100vw', '100vw', '14.5rem']}
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      variants={{
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        {accounts.map((walletAccount) => (
          <ItemWrapper
            key={walletAccount.address}
            disabled={walletAccount.address === account}
            onClick={() => {
              if (!(walletAccount.address === account))
                selectAccount({ account: walletAccount });
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
                <Avatar withNameOrAddress account={walletAccount.address} />
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
        <MenuProfileItem
          Icon={LogoutSVG}
          hasBorder={true}
          description="Disconnect"
          handleAction={() => {
            handleCloseProfile();
            disconnect();
          }}
        />
      </Box>
    </Motion>
  );
};

export default MenuProfile;
