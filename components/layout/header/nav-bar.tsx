import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NavBar: FC = () => {
  const { asPath, push } = useRouter();

  return (
    <Box display={['none', 'none', 'none', 'flex']} justifyContent="center">
      <Box
        py="s"
        fontSize="s"
        cursor="pointer"
        fontFamily="Proto"
        textAlign="center"
        borderRadius="full"
        border="0.25rem solid"
        px={['s', 's', 's', 'xl']}
        nActive={{ borderColor: '#0053DB33' }}
        onClick={() => asPath !== '/' && push('/')}
        color={asPath !== '/' ? 'onSurface' : 'primary'}
        borderColor={asPath !== '/' ? 'transparent' : '#0053DB33'}
      >
        Create coin
      </Box>
      <Box
        py="s"
        fontSize="s"
        cursor="pointer"
        fontFamily="Proto"
        textAlign="center"
        borderRadius="full"
        border="0.25rem solid"
        px={['s', 's', 's', 'xl']}
        nActive={{ borderColor: '#0053DB33' }}
        color={asPath !== '/my-coins' ? 'onSurface' : 'primary'}
        onClick={() => asPath !== '/my-coins' && push('/my-coins')}
        borderColor={asPath !== '/my-coins' ? 'transparent' : '#0053DB33'}
      >
        My Coins
      </Box>
      <Box
        py="s"
        fontSize="s"
        cursor="pointer"
        fontFamily="Proto"
        textAlign="center"
        borderRadius="full"
        border="0.25rem solid"
        px={['s', 's', 's', 'xl']}
        nActive={{ borderColor: '#0053DB33' }}
        color={asPath !== '/airdrop' ? 'onSurface' : 'primary'}
        onClick={() => asPath !== '/airdrop' && push('/airdrop')}
        borderColor={asPath !== '/airdrop' ? 'transparent' : '#0053DB33'}
      >
        Airdrop
      </Box>
    </Box>
  );
};

export default NavBar;
