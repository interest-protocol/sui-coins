import { Box, Button } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';

import Avatar from '@/components/account-info/avatar';

import MenuProfile from './menu-profile';
import MenuSwitchAccount from './menu-switch-account';

const Profile: FC = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenSwitchAccount, setIsOpenSwitchAccount] = useState(false);

  const handleOpenProfile = () => setIsOpenProfile(true);

  const [menuIsDropdown, setMenuIsDropdown] = useState(
    isOpenProfile || isOpenSwitchAccount
  );

  useEffect(() => {
    setMenuIsDropdown(isOpenProfile || isOpenSwitchAccount);
  }, [isOpenSwitchAccount, isOpenProfile]);

  const handleCloseProfile = () => {
    setIsOpenProfile(false);
    setIsOpenSwitchAccount(false);
  };

  const onBack = () => {
    setIsOpenProfile(true);
    setIsOpenSwitchAccount(false);
  };

  const handleOpenSwitch = () => {
    setIsOpenProfile(true);
    setIsOpenSwitchAccount(true);
  };

  return (
    <Box
      display="flex"
      cursor="pointer"
      flexDirection="column"
      zIndex={4}
      ml={['0rem', '0rem', '0rem', 'unset']}
      top={menuIsDropdown ? ['-5vh', '-5vh', '-5vh', 'unset'] : 'unset'}
      right={menuIsDropdown ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      width={menuIsDropdown ? ['104vw', '104vw', '104vw', 'unset'] : 'unset'}
      height={menuIsDropdown ? ['104vh', '104vh', '104vh', 'unset'] : 'unset'}
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
      <Box display={['flex', 'flex', 'flex', 'none']} mr="m">
        <Button
          gap="xs"
          p="unset"
          variant="text"
          borderRadius="full"
          borderColor="onSurface"
          onClick={handleOpenProfile}
        >
          <Avatar isLarge />
        </Button>
      </Box>
      <MenuProfile
        isOpen={isOpenProfile}
        handleOpenSwitch={handleOpenSwitch}
        handleCloseProfile={handleCloseProfile}
      />
      <MenuSwitchAccount
        onBack={onBack}
        isOpen={isOpenSwitchAccount}
        handleCloseProfile={handleCloseProfile}
      />
    </Box>
  );
};

export default Profile;
