import { Box, Button } from '@interest-protocol/ui-kit';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { useIsFirstRender } from '@/hooks/use-is-first-render';

import Avatar from './avatar';
import MenuProfile from './menu-profile';

const BOX_ID = 'wallet-box';

const Profile: FC = () => {
  const { isConnecting } = useCurrentWallet();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const currentAccount = useCurrentAccount();
  const isFirstRender = useIsFirstRender();
  const account = currentAccount?.address || '';

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == BOX_ID) ||
      event?.composedPath()?.some((node: any) => node?.id == BOX_ID)
    )
      return;

    setIsOpenProfile(false);
  };

  const connectedBoxRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

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
      top={isOpenProfile ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      right={isOpenProfile ? ['-2rem', '-2rem', '-2rem', 'unset'] : 'unset'}
      width={isOpenProfile ? ['110vw', '110vw', '110vw', 'unset'] : 'unset'}
      height={isOpenProfile ? ['100vh', '100vh', '100vh', 'unset'] : 'unset'}
      position={
        isOpenProfile
          ? ['absolute', 'absolute', 'absolute', 'relative']
          : 'relative'
      }
      bg={
        isOpenProfile
          ? ['container', 'container', 'container', 'unset']
          : 'unset'
      }
    >
      {account && (
        <Button
          p="2xs"
          gap="xs"
          variant="tonal"
          borderRadius="xs"
          alignItems="center"
          display={[
            isOpenProfile ? 'none' : 'flex',
            isOpenProfile ? 'none' : 'flex',
            isOpenProfile ? 'none' : 'flex',
            'flex',
          ]}
          onClick={() => setIsOpenProfile(not)}
        >
          <Avatar withNameOrAddress account={account} />
          {isConnecting && <Skeleton width="7rem" />}
        </Button>
      )}
      {!isFirstRender && (
        <MenuProfile
          isOpen={isOpenProfile}
          handleCloseProfile={() => setIsOpenProfile(false)}
        />
      )}
    </Box>
  );
};

export default Profile;
