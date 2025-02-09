import { Box } from '@interest-protocol/ui-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import Avatar from '@/components/account-info/avatar';
import { LOCAL_STORAGE_VERSION } from '@/constants';
import { Explorer, EXPLORER_STORAGE_KEY } from '@/constants/explorer';
import { RPC_KEY, RPCEnum } from '@/constants/rpc';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useIsFirstRender } from '@/hooks/use-is-first-render';

import MenuExplorer from './menu-explorer';
import MenuProfile from './menu-profile';
import MenuSwitchAccount from './menu-switch-account';
import MenuSwitchRPC from './menu-switch-rpc';

const BOX_ID = 'wallet-box';

const Profile: FC = () => {
  const [isOpenRPC, setIsOpenRPC] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [isOpenExplorer, setIsOpenExplorer] = useState(false);
  const [explorer, setExplorer] = useLocalStorage<Explorer>(
    `${LOCAL_STORAGE_VERSION}-${EXPLORER_STORAGE_KEY}`,
    Explorer.SuiVision
  );
  const [rpc, setRPC] = useLocalStorage<RPCEnum>(
    `${LOCAL_STORAGE_VERSION}-${RPC_KEY}`,
    RPCEnum.Shinami
  );
  const [menuIsDropdown, setMenuIsDropdown] = useState(
    isOpenProfile || isOpenAccount
  );
  const currentAccount = useCurrentAccount();
  const isFirstRender = useIsFirstRender();
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
    setIsOpenProfile(true);
  };

  const handleCloseProfile = () => {
    handleCloseAccount();
    setIsOpenProfile(false);
  };

  const handleOpenAccount = () => {
    handleCloseProfile();
    setIsOpenAccount(true);
  };

  const handleOpenRPC = () => {
    handleCloseProfile();
    setIsOpenRPC(true);
  };

  const handleCloseAccount = () => {
    setIsOpenAccount(false);
  };

  const handleOpenExplorer = () => {
    handleCloseProfile();
    setIsOpenExplorer(true);
  };

  const handleCloseExplorer = () => {
    setIsOpenExplorer(false);
    setIsOpenProfile(false);
  };

  const handleCloseRPC = () => {
    setIsOpenRPC(false);
    setIsOpenProfile(true);
  };

  const handleCloseAll = () => {
    handleCloseRPC();
    handleCloseAccount();
    handleCloseProfile();
    handleCloseExplorer();
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
          alignItems="center"
          display={[
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            menuIsDropdown ? 'none' : 'flex',
            'flex',
          ]}
          onClick={
            isOpenProfile || isOpenAccount ? handleCloseAll : handleOpenProfile
          }
        >
          <Avatar isLarge />
        </Box>
      )}
      {!isFirstRender && (
        <>
          <MenuProfile
            isOpen={isOpenProfile}
            handleOpenRPC={handleOpenRPC}
            handleOpenSwitch={handleOpenAccount}
            handleCloseProfile={handleCloseProfile}
            handleOpenExplorer={handleOpenExplorer}
          />
          {isOpenAccount && (
            <MenuSwitchAccount
              isOpen={isOpenAccount}
              onBack={handleOpenProfile}
              handleCloseProfile={handleCloseProfile}
            />
          )}
          {isOpenRPC && (
            <MenuSwitchRPC
              rpc={rpc}
              isOpen={isOpenRPC}
              handleRPC={setRPC}
              onBack={handleCloseRPC}
              handleCloseProfile={handleCloseProfile}
            />
          )}
          {isOpenExplorer && (
            <MenuExplorer
              explorer={explorer}
              isOpen={isOpenExplorer}
              onBack={handleCloseExplorer}
              handleExplorer={setExplorer}
              handleCloseProfile={handleCloseProfile}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Profile;
