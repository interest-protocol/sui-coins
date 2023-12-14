import { Box, Motion } from '@interest-protocol/ui-kit';
import { useWalletKit } from '@mysten/wallet-kit';
import { useRouter } from 'next/router';
import { toPairs } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { v4 } from 'uuid';

import ConnectWalletButton from '@/components/wallet/connect-wallet-button';
import { DISPLAY_NETWORK, wrapperVariants } from '@/constants';
import { useNetwork } from '@/context/network';
import { ArrowLeftSVG, SignOutSVG, SuiLogoSVG } from '@/svg';

import Avatar from '../avatar';
import { MenuOptionsProps } from './menu-option.types';
import OptionItem from './option-item';

const AccountSubMenu: FC<{ closeSubmenu: () => void }> = ({ closeSubmenu }) => {
  const { accounts, currentAccount, selectAccount } = useWalletKit();

  return (
    <>
      <OptionItem>
        <Box onClick={closeSubmenu}>
          <ArrowLeftSVG maxWidth="1.4rem" maxHeight="1.4rem" width="100%" />
        </Box>
        <Box fontFamily="Proto">Network</Box>
      </OptionItem>
      {accounts.map((account) => (
        <OptionItem
          key={v4()}
          onClick={() => selectAccount(account)}
          selected={currentAccount?.address === account.address}
        >
          <Avatar withNameOrAddress account={account} />
        </OptionItem>
      ))}
    </>
  );
};

const NetworkSubMenu: FC<{ closeSubmenu: () => void }> = ({ closeSubmenu }) => {
  const { network, changeNetwork } = useNetwork();

  return (
    <>
      <OptionItem>
        <Box onClick={closeSubmenu}>
          <ArrowLeftSVG maxWidth="1.4rem" maxHeight="1.4rem" width="100%" />
        </Box>
        <Box fontFamily="Proto">Network</Box>
      </OptionItem>
      {toPairs(DISPLAY_NETWORK).map(([networkKey, networkDisplay]) => (
        <OptionItem
          key={v4()}
          selected={network === networkKey}
          onClick={() => changeNetwork(networkKey)}
        >
          <SuiLogoSVG maxWidth="2rem" maxHeight="2rem" />
          <Box>Sui {networkDisplay}</Box>
        </OptionItem>
      ))}
    </>
  );
};

const MenuOptions: FC<MenuOptionsProps> = ({
  isMenuOpen,
  handleDisconnect,
}) => {
  const { network } = useNetwork();
  const { asPath, push } = useRouter();
  const { isConnected } = useWalletKit();
  const [submenu, setSubmenu] = useState<ReactNode>(null);

  const closeSubmenu = () => setSubmenu(null);

  const openAccountSubmenu = () =>
    setSubmenu(<AccountSubMenu closeSubmenu={closeSubmenu} />);

  const openNetworkSubmenu = () =>
    setSubmenu(<NetworkSubMenu closeSubmenu={closeSubmenu} />);

  return (
    <Motion
      right="0"
      top="4rem"
      zIndex={4}
      width="14.5rem"
      initial="closed"
      border="1px solid"
      borderRadius="1rem"
      position="absolute"
      bg="lowestContainer"
      variants={wrapperVariants}
      textTransform="capitalize"
      borderColor="outlineVariant"
      animate={isMenuOpen ? 'open' : 'closed'}
      pointerEvents={isMenuOpen ? 'auto' : 'none'}
      boxShadow="0px 2px 4px -2px rgba(13, 16, 23, 0.04), 0px 4px 8px -2px rgba(13, 16, 23, 0.12);"
    >
      {submenu ?? (
        <>
          {isConnected && (
            <OptionItem
              withBorderBottom
              withSubmenu
              onClick={openAccountSubmenu}
            >
              <Avatar withNameOrAddress />
            </OptionItem>
          )}
          <OptionItem
            mobileOnly
            selected={asPath == '/'}
            onClick={() => asPath !== '/' && push('/')}
          >
            Create Coin
          </OptionItem>
          <OptionItem
            mobileOnly
            withBorderBottom
            selected={asPath == '/use-get-all-coins'}
            onClick={() =>
              asPath !== '/use-get-all-coins' && push('/use-get-all-coins')
            }
          >
            My Coins
          </OptionItem>
          {isConnected ? (
            <>
              <OptionItem
                mobileOnly
                withSubmenu
                withBorderBottom
                onClick={openNetworkSubmenu}
              >
                <SuiLogoSVG maxWidth="2rem" maxHeight="2rem" />
                <Box>{DISPLAY_NETWORK[network]}</Box>
              </OptionItem>
              <OptionItem onClick={handleDisconnect}>
                <Box display="flex" color="error">
                  <SignOutSVG
                    maxWidth="1.5rem"
                    maxHeight="1.5rem"
                    width="100%"
                  />
                </Box>
                <Box color="error">Sign Out</Box>
              </OptionItem>
            </>
          ) : (
            <OptionItem>
              <ConnectWalletButton />
            </OptionItem>
          )}
        </>
      )}
    </Motion>
  );
};

export default MenuOptions;
