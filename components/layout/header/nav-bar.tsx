import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NavBar: FC = () => {
  const { asPath, push } = useRouter();

  return (
    <Box display="flex">
      <Box
        px="xl"
        py="xs"
        fontSize="s"
        cursor="pointer"
        fontFamily="Proto"
        borderRadius="full"
        border="0.25rem solid"
        borderColor={asPath !== '/' ? 'transparent' : '#0053DB33'}
        nActive={{
          borderColor: '#0053DB33',
        }}
        onClick={() => asPath !== '/' && push('/')}
      >
        Create coin
      </Box>
      <Box
        px="xl"
        py="xs"
        fontSize="s"
        cursor="pointer"
        fontFamily="Proto"
        borderRadius="full"
        border="0.25rem solid"
        borderColor={asPath !== '/my-coins' ? 'transparent' : '#0053DB33'}
        onClick={() => asPath !== '/my-coins' && push('/my-coins')}
        nActive={{
          borderColor: '#0053DB33',
        }}
      >
        My Coins
      </Box>
    </Box>
  );
};

export default NavBar;
