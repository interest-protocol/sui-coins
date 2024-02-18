import { Box } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import Avatar from '@/components/account-info/avatar';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import MenuProfile from './menu-profile';
import MenuSwitchAccount from './menu-switch-account';

const BOX_ID = 'wallet-box';

const Profile: FC = () => {
  const { query } = useRouter();
  const [isOpenProfile, setIsOpenProfile] = useState(Boolean(query.profile));
  const [isOpenAccount, setIsOpenAccount] = useState(Boolean(query.account));
  const [menuIsDropdown, setMenuIsDropdown] = useState(
    isOpenProfile || isOpenAccount
  );
  const currentAccount = useCurrentAccount();

  const account = currentAccount?.address || '';

  useEffect(() => {
    setMenuIsDropdown(isOpenProfile || isOpenAccount);
  }, [isOpenAccount, isOpenProfile]);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    handleCloseProfile();
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  const handleOpenProfile = () => {
    handleCloseAccount();
    const url = new URL(window.location.href);
    url.searchParams.set('profile', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    handleCloseAccount();
    const url = new URL(window.location.href);
    url.searchParams.delete('profile');
    window.history.pushState('', '', url.toString());
    setIsOpenProfile(false);
  };

  const handleOpenAccount = () => {
    handleCloseProfile();
    const url = new URL(window.location.href);
    url.searchParams.set('account', 'true');
    window.history.pushState('', '', url.toString());
    setIsOpenAccount(true);
  };

  const handleCloseAccount = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('account');
    window.history.pushState('', '', url.toString());
    setIsOpenAccount(false);
  };

  return (
    <Box
      id={BOX_ID}
      display="flex"
      cursor="pointer"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={connectedBoxRef}
      flexDirection="column"
      justifyContent="center"
      top={menuIsDropdown ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      right={menuIsDropdown ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      width={menuIsDropdown ? ['110vw', '110vw', '110vw', 'unset'] : 'unset'}
      height={menuIsDropdown ? ['100vh', '100vh', '100vh', 'unset'] : 'unset'}
      position={
        menuIsDropdown
          ? ['absolute', 'absolute', 'absolute', 'relative']
          : 'relative'
      }
      bg={
        menuIsDropdown
          ? ['container', 'container', 'container', 'unset']
          : 'unset'
      }
    >
      {account && (
        <Box
          gap="m"
          display={[
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            'flex',
          ]}
          alignItems="center"
          onClick={handleOpenProfile}
        >
          <Avatar isLarge />
        </Box>
      )}
      <MenuProfile
        isOpen={isOpenProfile}
        handleOpenSwitch={handleOpenAccount}
        handleCloseProfile={handleCloseProfile}
      />
      <MenuSwitchAccount
        isOpen={isOpenAccount}
        onBack={handleOpenProfile}
        handleCloseProfile={handleCloseProfile}
      />
    </Box>
  );
};

export default Profile;
