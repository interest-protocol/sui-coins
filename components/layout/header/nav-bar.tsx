import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { MENU_ITEMS } from './nav-bar.data';

const NavBar: FC = () => {
  const { asPath, push } = useRouter();

  return (
    <Box display={['none', 'none', 'none', 'flex']} justifyContent="center">
      {MENU_ITEMS.map(({ path, name }) => (
        <Button
          key={v4()}
          variant="text"
          border="0.25rem solid"
          onClick={() => push(path)}
          color={asPath !== path ? 'onSurface' : 'primary'}
          borderColor={asPath !== path ? 'transparent' : '#0053DB33'}
        >
          {name}
        </Button>
      ))}
    </Box>
  );
};

export default NavBar;
