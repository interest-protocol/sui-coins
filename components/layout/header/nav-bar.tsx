import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { MENU_ITEMS } from './nav-bar.data';

const NavBar: FC = () => {
  const { asPath, push } = useRouter();

  return (
    <Box display={['none', 'none', 'none', 'flex']} justifyContent="center">
      {MENU_ITEMS.map(({ path, name }) => (
        <Box
          key={v4()}
          py="s"
          fontSize="s"
          cursor="pointer"
          fontFamily="Proto"
          textAlign="center"
          borderRadius="full"
          border="0.25rem solid"
          px={['s', 's', 's', 'xl']}
          onClick={() => push(path)}
          nHover={{ color: 'primary' }}
          transition="all 0.3s ease-in-out"
          nActive={{ borderColor: '#0053DB33' }}
          color={asPath !== path ? 'onSurface' : 'primary'}
          borderColor={asPath !== path ? 'transparent' : '#0053DB33'}
        >
          {name}
        </Box>
      ))}
    </Box>
  );
};

export default NavBar;
