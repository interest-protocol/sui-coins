import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';

import { DeviceMenuType } from './header.types';
import MoreButton from './more-button';
import { MENU_ITEMS } from './nav-bar.data';

const NavBar: FC = () => {
  const { asPath, push } = useRouter();

  const isPoolPathChild = [
    Routes[RoutesEnum.PoolDetails],
    Routes[RoutesEnum.CreatePool],
  ].includes(asPath.split('?')[0]);

  return (
    <Box
      display={['none', 'none', 'none', 'flex']}
      justifyContent="center"
      alignItems="center"
    >
      {MENU_ITEMS.filter(({ device }) =>
        [DeviceMenuType.Both, DeviceMenuType.Desktop].includes(device)
      ).map(({ path, name }) => (
        <Box
          key={v4()}
          py="s"
          fontSize="s"
          display="flex"
          cursor="pointer"
          fontFamily="Proto"
          textAlign="center"
          borderRadius="full"
          alignItems="center"
          border={asPath == path ? '0.25rem solid' : 'unset'}
          px={['s', 's', 's', 'xl']}
          onClick={() => push(path)}
          nHover={{
            color:
              path == Routes[RoutesEnum.Pools] && isPoolPathChild
                ? 'lowestContainer'
                : 'primary',
          }}
          transition="all 0.3s ease-in-out"
          nActive={{ borderColor: '#0053DB33', border: '0.25rem solid' }}
          color={
            asPath !== path
              ? path == Routes[RoutesEnum.Pools] && isPoolPathChild
                ? 'lowestContainer'
                : 'onSurface'
              : 'primary'
          }
          bg={
            path == Routes[RoutesEnum.Pools] && isPoolPathChild
              ? 'primary'
              : 'unset'
          }
          borderColor={
            asPath !== path
              ? path == Routes[RoutesEnum.Pools] && isPoolPathChild
                ? '#0053DB33'
                : 'transparent'
              : '#0053DB33'
          }
        >
          {name}
        </Box>
      ))}
      <MoreButton />
    </Box>
  );
};

export default NavBar;
